# Process overview

## What I built

ANUHub's guestbook starter rebuilt into a student function finder: a static
catalog of 29 real ANU student-facing functions grouped into six task-oriented
categories, instant client-side search, and per-browser pin persistence backed
by SQLite. `README.md` covers what the app is and what good looks like here;
this is how the agent and I got there.

## How I got here

**Rebuild + first design checkpoint —
[`a5b8708`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-astra-erevos/commit/a5b870841722a89d0c5e39481e4b74067b1cc4fc).**
The starter's guestbook (SSE messages table) was replaced with the catalog,
the six-category IA, the Pinned shelf, a curated Common Tasks strip, and the
dark-header visual direction. I asked to hold this as a checkpoint before
touching search behaviour:

> Before we change the search behaviour, I want to keep the current version as
> a design checkpoint. Please run the checks again, then commit the current
> state with a clear commit message. Don't make any further design changes
> yet, and don't push/deploy yet.

That commit also carries a fix I flagged from a screenshot — the header search
box rendered off-centre ("最上面的搜索框歪了") — traced by the agent to a CSS
specificity bug (`margin: 0` on `.site-bar #search` zeroing the auto-centering
margins from `.site-bar > *`) and fixed by changing it to `margin: 0 auto`.
The agent also self-caught and fixed a test bug: `spec/anuhub.test.ts`'s probe
function coincided with a curated Common Tasks id, which threw off the
pin-count assertions — fixed by excluding `COMMON_TASK_IDS` from the probe
selection.

**Search-results mode —
[`4724a01`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-astra-erevos/commit/4724a015590836ddd344f1759bccf4adba0f7b0f).**
Manual testing of the checkpoint surfaced a real usability problem: matches
rendered below the fold, under Pinned/Common tasks/Full catalog, so typing a
query looked like nothing had happened. I asked for a dedicated mode instead
of just trimming spacing:

> I don't think reducing the vertical spacing is enough. When the search query
> is non-empty, I want the page to enter a clear search-results mode. Show the
> matching functions immediately below the search box, with a result count
> such as "2 results for degree transfer". Temporarily hide or collapse
> Pinned, Common tasks, and the normal Full catalog while searching. [...]
> Keep the search client-side and instant.

This is the one interaction change made across the whole session — everything
after it is presentation refinement on top of it, by design.

**Refinement pass on the homepage IA and density (uncommitted at the time of
writing; lands in the commit right after this file).** After the
search-results checkpoint, three rounds of hands-on browser review drove
further changes, each verified the same way (checks, then eyes on
`pnpm dev`) before moving to the next:

1. Widened the desktop content column and split the Full catalog rows into
   two CSS columns at ≥60rem; strengthened the header into an "ANU Student
   Administration / ANUHub" lockup and relabelled the About link; renamed
   "Common tasks" to "Quick access" with a note explaining the deliberate
   overlap with the catalog below; made the empty Pinned state compact; moved
   `requests` out of Classes & enrolment into Help & other services, since
   "submit and track academic requests" isn't enrolment-specific.
2. A follow-up pass tightened the Pinned/Quick-access card padding, icon size,
   and gap specifically (scoped to `.card[data-variant="card"]`, leaving the
   Full catalog's `[data-variant="row"]` styling untouched), after I judged
   the first pass's cards still oversized relative to the catalog rows.
3. A second density pass gave Quick access its own 3×2 grid and a further
   density override on top of the shared card baseline, and tightened the
   margins between the intro/Pinned/Quick-access blocks, specifically so the
   top of Full catalog is visible on a normal desktop viewport without
   scrolling — the concrete acceptance bar I gave for that round.

**How I knew it was right.** `pnpm check` (typecheck, build, and the full
vitest suite — pin persistence, invariants, axe accessibility floor) had to
stay green after every step; it caught nothing broken across any of these
rounds. Search filtering and the layout/density decisions have no automated
coverage — this repo's test tooling never executes client scripts — so those
were verified by hand in the browser each round: searching, pinning,
reloading for persistence, and unpinning, most recently confirmed working
end-to-end right before this file was written.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
