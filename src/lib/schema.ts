import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

// The schema is the ground truth for the database. To change it: edit here,
// run `pnpm db:generate` to turn the diff into a migration under drizzle/,
// and commit both — the migration applies automatically when the server
// boots (see src/lib/db.ts), locally and deployed. Never edit the database
// by hand: state on the deployed volume outlives every deploy, and the
// migration trail is what keeps old state and new code compatible.
//
// The function catalog itself (src/lib/functions.ts) is static data in code,
// not a table here — it's curated content, not something visitors create.
// This table only holds which of those functions each anonymous visitor has
// pinned.
export const pins = sqliteTable(
  "pins",
  {
    id: int().primaryKey({ autoIncrement: true }),
    visitorId: text("visitor_id").notNull(),
    functionId: text("function_id").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [uniqueIndex("pins_visitor_function_unique").on(table.visitorId, table.functionId)],
);

export type Pin = typeof pins.$inferSelect;
