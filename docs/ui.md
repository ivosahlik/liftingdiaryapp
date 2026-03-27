# UI Coding Standards

## Component Library

**Only shadcn/ui components may be used for UI in this project.**

- Do NOT create custom UI components (buttons, inputs, cards, dialogs, tables, etc.)
- Do NOT use raw HTML elements styled with Tailwind as a substitute for a shadcn component
- Install components via the shadcn CLI: `npx shadcn@latest add <component>`
- All installed components live in `components/ui/` — do not modify them directly

If a shadcn component does not exist for a use case, compose using existing shadcn primitives only.

## Date Formatting

Use `date-fns` for all date formatting. Dates must be displayed in the following format:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

Use the `do MMM yyyy` format token with `date-fns/format`:

```ts
import { format } from "date-fns";

format(date, "do MMM yyyy"); // "1st Sep 2025"
```

Never use `Date.toLocaleDateString()`, `Date.toDateString()`, or manual string construction for display dates.
