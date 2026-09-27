import type { APIRoute } from "astro";
import { FUNCTIONS_BY_ID } from "../../lib/functions";
import { togglePin } from "../../lib/db";
import { ensureVisitorId } from "../../lib/visitor";

// One endpoint for both the no-JS and the JS-enhanced pin toggle: they're the
// same <form> in index.astro, and differ only in what response shape the
// caller wants — signalled by Accept, exactly like a plain browser form POST
// vs an explicit fetch() do already.
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const visitorId = ensureVisitorId(cookies);
  const form = await request.formData();
  const functionId = String(form.get("function_id") ?? "");

  if (!FUNCTIONS_BY_ID.has(functionId)) {
    return new Response("unknown function", { status: 400 });
  }

  const pinned = togglePin(visitorId, functionId);

  const wantsJson = request.headers.get("accept")?.includes("application/json") ?? false;
  if (wantsJson) {
    return new Response(JSON.stringify({ functionId, pinned }), {
      headers: { "content-type": "application/json" },
    });
  }
  return redirect("/", 303);
};
