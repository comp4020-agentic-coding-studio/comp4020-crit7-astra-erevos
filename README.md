# ANUHub, redesigned around finding a function

ANUHub is the site every ANU student uses to enrol, check grades, pay fees,
and update their details. Finding the right function on it is the actual
pain point: the homepage groups things by which backend system owns them, not
by what a student is trying to do, and searching surfaces a flood of
admin/backend PeopleSoft entries alongside the handful of student-facing
functions you actually want. This prototype rebuilds that one flow — finding
and pinning a function — not the rest of ANUHub.

It's a catalog of 29 student functions grouped into six task-oriented
categories (classes & enrolment, results & records, money & payments, degree &
graduation, personal details & access, help & other services) instead of by
PeopleSoft system, an instant client-side search box, and a star on every
function that pins it to a shelf at the top of the page. A curated "Common
tasks" strip surfaces the handful of highest-frequency actions right below the
shelf, so the most common student needs don't require scrolling past the full
catalog first — which stays immediately open below it, in six collapsible-but-
open-by-default sections, not buried behind extra clicks. Pins are the
full-stack core flow: they're written to SQLite, keyed to an anonymous
per-browser cookie, and are still there after a reload.

## What good looks like here

- **Breadth without the noise.** The catalog (`src/lib/functions.ts`) is
  built from the real ANUHub's homepage tiles, "Search in Menu" suggestions,
  and NavBar folder tree — every genuinely student-facing action from those
  screens is here (transcripts, refunds, degree transfer, delegated access,
  campus incident reports, and more). What's cut is specifically the
  backend/admin/config noise that pollutes the real search results:
  PeopleTools, Enterprise Components, batch/config processes (AHEGS
  Processing, AG Composer, Refresh Personal Data, Content Items/Types, Budget
  Types), staff-facing tools (Timesheet Administration, Application Entry
  Centre, Manager Self Service), and PeopleSoft UI settings (My Preferences,
  Define Image Dimensions). Noise is solved by exclusion, not by shrinking the
  list down to a handful of illustrative examples.
- **No round-trip for search.** The whole catalog is already rendered on the
  page; typing in the search box just shows/hides cards in the DOM. No
  spinner, because there's nothing to wait on.
- **Pins persist, and they're yours.** Pinning is per-browser (an anonymous
  cookie, not an account) rather than a shared list — this is a prototype
  about the finding/pinning interaction, not about building real ANU auth. A
  pin survives a reload; it's stored in SQLite, one row per (visitor, function).
- **A pinned function isn't hidden.** Pinning adds a shortcut to the shelf; it
  never removes the function from its category section, so the card you just
  starred doesn't vanish from under your cursor.
- **Progressive enhancement, deliberately.** Every pin button is a real
  `<form method="post">`; without JavaScript it still works via a full-page
  reload. JavaScript only adds the optimistic, no-reload update on top.
- **A recognisable ANUHub, not a generic dashboard.** The header is a dark
  command bar with the search box built in, under a thin ANU-gold rule —
  deliberately echoing the real ANUHub's own black top nav, not a white SaaS
  hero. Gold stays a thin accent throughout (the rule, pinned-shelf border,
  category accent bars, pinned state) rather than a wash of colour, in line
  with ANU's own brand guidance that gold should read as an accent, not a
  background.
- **What's a judgement call, not a checked rule:** which real menu items count
  as "student-facing" vs. "backend noise", the six task categories and their
  priority order, which ~6 functions belong in "Common tasks", and the visual
  direction (dark header, gold accents, compact catalog rows) were all design
  choices made while looking at screenshots of the real ANUHub's clutter — not
  something a test can verify. `spec/anuhub.test.ts` checks the one thing that
  can be checked mechanically: a pin survives a reload, and unpinning removes
  it again. Search filtering and the search-driven accordion auto-expand are
  client-side JS with no automated coverage, since this repo's test tooling
  never executes scripts — that gap is checked by hand instead (see
  `CLAUDE.md`).
