---
name: docs directory and CLAUDE.md list state
description: Tracks which /docs files are known and referenced in CLAUDE.md Code Generation Guidelines, and naming/ordering conventions
type: project
---

As of 2026-03-29, the full list of /docs files referenced in CLAUDE.md under '## Code Generation Guidelines' is, in alphabetical order:

- /docs/all.md (added 2026-03-29 — overview of all coding standards)
- /docs/auth.md
- /docs/data-fetching.md
- /docs/data-mutations.md
- /docs/routing.md (added 2026-03-29 — routing conventions and standards)
- /docs/server-components.md
- /docs/ui.md

**Why:** The bullet list must stay in sync with the actual /docs directory so code generation agents always consult the right docs.

**How to apply:** When a new /docs/*.md file is reported, check it exists via Glob, confirm it is not already listed, then insert it in alphabetical position within the bullet list under '## Code Generation Guidelines'. Only touch that list; leave all other CLAUDE.md content unchanged.
