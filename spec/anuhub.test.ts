import { beforeAll, describe, expect, inject, it } from "vitest";
import { COMMON_TASK_IDS, FUNCTIONS } from "../src/lib/functions";

// The core flow the spec asks for: pin a function, and it's still there after
// a reload. A bare fetch doesn't persist cookies across calls the way a
// browser does, so this test carries the Set-Cookie -> Cookie handoff itself.
const baseUrl = inject("baseUrl");
// Must avoid the curated "Common tasks" strip: those functions render a
// second, always-present card regardless of pin state, which would throw
// off the 1-unpinned/2-pinned counts this test relies on.
const probeFunctionId = FUNCTIONS.find((fn) => !COMMON_TASK_IDS.includes(fn.id))!.id;

// Every card (shelf or category grid) is an <article class="card"
// data-function-id="..."> — that opening tag appears exactly once per card,
// so counting it distinguishes "only in the category grid" (1) from "also
// pinned onto the shelf" (2) without depending on markup nesting. (The pin
// button inside each card also carries a data-function-id, so a plain
// substring count of the attribute alone would double these numbers.)
function countCardOccurrences(html: string, functionId: string): number {
  return html.split(`<article class="card" data-function-id="${functionId}"`).length - 1;
}

describe("anuhub pins", () => {
  let cookie: string;

  beforeAll(async () => {
    const res = await fetch(baseUrl);
    const setCookie = res.headers.get("set-cookie");
    if (!setCookie) throw new Error("no Set-Cookie on first visit");
    cookie = setCookie.split(";")[0];
  });

  it("issues a visitor_id cookie on first visit", () => {
    expect(cookie).toMatch(/^visitor_id=/);
  });

  // Astro checks form POSTs carry a same-origin Origin header (CSRF
  // protection); browsers send it automatically, a bare fetch doesn't.
  const postPin = () =>
    fetch(new URL("/api/pins", baseUrl), {
      method: "POST",
      headers: {
        origin: baseUrl,
        cookie,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ function_id: probeFunctionId }),
      redirect: "manual",
    });

  it("starts unpinned: the function appears only in its category grid", async () => {
    const res = await fetch(baseUrl, { headers: { cookie } });
    const html = await res.text();
    expect(countCardOccurrences(html, probeFunctionId)).toBe(1);
  });

  it("pins on toggle and persists across a reload", async () => {
    const post = await postPin();
    expect(post.status).toBe(303);
    expect(post.headers.get("location")).toBe("/");

    const reload = await fetch(baseUrl, { headers: { cookie } });
    const html = await reload.text();
    expect(countCardOccurrences(html, probeFunctionId)).toBe(2);
  });

  it("unpins on a second toggle", async () => {
    const post = await postPin();
    expect(post.status).toBe(303);

    const reload = await fetch(baseUrl, { headers: { cookie } });
    const html = await reload.text();
    expect(countCardOccurrences(html, probeFunctionId)).toBe(1);
  });
});

// Search filtering is pure client-side JS, and this repo's test tooling never
// executes scripts (jsdom runs with runScripts: "outside-only", no real
// browser in the suite) — so there is deliberately no automated coverage for
// search here.
