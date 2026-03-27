# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Docs

Before generating any code, **always read the relevant file(s) in `/docs`** for this project's standards and conventions. The `/docs` directory is the source of truth for how code should be written in this project.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured yet.

## Stack

- **Next.js 16.2.1** with App Router — breaking changes from prior versions; consult `node_modules/next/dist/docs/` before writing code
- **React 19**
- **TypeScript** (strict mode, path alias `@/*` maps to project root)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — new CSS-first config approach, no `tailwind.config.js`
- **ESLint v9** flat config (`eslint.config.mjs`)

## Architecture

Early-stage app — only the Next.js App Router scaffold exists so far.

- `app/` — all routes and layouts (App Router)
- `app/layout.tsx` — root layout with font setup and global metadata
- `app/globals.css` — global styles; Tailwind v4 directives go here
- `public/` — static assets

No database, auth, or API routes have been added yet.
