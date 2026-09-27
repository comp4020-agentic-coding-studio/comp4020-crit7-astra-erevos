# Your harness

This file is yours, and it arrives empty on purpose. The rules you hold the
agent to are part of what gets marked, so they should be rules you decided on.

Nothing about the starter is recorded here. What the repo ships is explained
where it lives --- `fly.toml`, the `Dockerfile`, the CI workflow and
`spec/README.md` each say what they fix --- and the
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes this deliverable's brief and spec. Read them before you plan or build;
what the agent needs to carry from any of it is your call.

## Rules for this prototype

- The function catalog (`src/lib/functions.ts`) is static data in code, not a
  database table --- it's curated content, not something a visitor creates.
  The only DB-backed state is `pins`.
- Pins are per-browser via an anonymous cookie (`src/lib/visitor.ts`), not
  real auth --- don't add a login/session system here.
- No SSE or other live cross-tab sync for pins, by design. The scope is
  search + pin + persist, nothing more.
