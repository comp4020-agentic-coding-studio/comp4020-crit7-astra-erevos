import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { type Pin, pins } from "./schema";

// One SQLite file is the app's whole persistent state. In production
// fly.toml points DATABASE_PATH at the machine's volume (/data), which is
// how state survives a reload and a redeploy; locally it defaults to an
// untracked file in .data/.
const path = process.env.DATABASE_PATH ?? "./.data/app.db";
mkdirSync(dirname(path), { recursive: true });

const client = new Database(path);
client.pragma("journal_mode = WAL");

export const db = drizzle(client);

// Migrations run at boot, on whatever machine holds the volume — the
// recommended shape for SQLite on Fly, where there's no separate machine to
// run them from. The flow: edit src/lib/schema.ts, `pnpm db:generate`,
// commit the migration it writes to drizzle/.
migrate(db, { migrationsFolder: "./drizzle" });

export type { Pin };

export function listPinnedFunctionIds(visitorId: string): string[] {
  return db
    .select({ functionId: pins.functionId })
    .from(pins)
    .where(eq(pins.visitorId, visitorId))
    .orderBy(desc(pins.id))
    .all()
    .map((row) => row.functionId);
}

export function togglePin(visitorId: string, functionId: string): boolean {
  const existing = db
    .select({ id: pins.id })
    .from(pins)
    .where(and(eq(pins.visitorId, visitorId), eq(pins.functionId, functionId)))
    .get();

  if (existing) {
    db.delete(pins).where(eq(pins.id, existing.id)).run();
    return false;
  }

  db.insert(pins).values({ visitorId, functionId }).run();
  return true;
}
