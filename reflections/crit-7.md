# Crit 7 reflection

## What was the breakthrough that moved the work forward?

It wasn't a single moment — it was three rounds of build, then actually look
at it. The first catalog against the real ANUHub screenshots only modelled 9
functions, hiding genuine student-facing actions rather than reducing noise,
so it had to grow to the real ~29. That broke the layout: 29 equal-sized
cards under 3 broad categories read as one undifferentiated wall, not an
improvement over hiding items. The fix wasn't shrinking the catalog again
but reorganising it — six task-oriented categories, a small curated "Quick
access" set for the highest-frequency tasks, and a denser row layout for the
full list, so scanning got easier without deleting anything. Search had the
same pattern: it looked done once results filtered correctly, but only
clicking around showed matches rendering below Pinned/Quick access/the full
catalog, effectively invisible on a normal viewport — invisible to a
correctness check, obvious the moment a human tried to use it. Each of these
only surfaced by using the thing, not by reasoning about it.

## What did this work change about who I want to be as a software developer?

I want to treat manual, in-browser verification as a necessary complement to
green tests. The
automated suite (typecheck, build, pin-persistence, accessibility floor)
stayed green through every one of these problems — it checks that code runs,
not that a layout is legible or a feature is reachable. The pin flow itself
(anonymous per-browser cookie, SQLite-backed, optimistic UI update with a
server fallback) only felt right once I'd pinned something, reloaded, and
unpinned it myself. Density and hierarchy took three explicit passes, not
one — I want to keep budgeting for that instead of treating the first
working version as finished.
