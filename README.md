This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

#

# Claude Code
prompts
1) claude
2) /init
3) create .claude/settings.local.json with empty json
4) clerk -> https://dashboard.clerk.com/
5) @ .. you can find right path, \ .. new line
6) prompts
7) /context
8) /clear
9) https://www.webdeveducation.com/context-window-llm-code-generation/ –> github auth
10) https://console.neon.tech/app/org-long-hill-24488465/welcome –> github auth
11) ui.shadcn.com -> UI
12) orm.drizzle.team -> Neon je moderní cloudová databáze postavená na PostgreSQL — ale s architekturou navrženou pro cloud (serverless přístup).
13) https://ui.shadcn.com/ -> npx shadcn@latest init
14) Clerk auth -> https://www.avg.com/en-us/random-password-generator#mac
15) MCP https://neon.com/docs/ai/connect-mcp-clients-to-neon -> npx add-mcp https://mcp.neon.tech/mcp -> added .mcp.json
16) ```1 server
                                                                                                                                                                                                                                                                                                  
    Project MCPs (/Users/ivovosahlik/Public/workspace-ai-claude/liftingdiaryapp/.mcp.json)                                                                                                                                                                                                        
❯ neon · △ needs authentication

https://code.claude.com/docs/en/mcp for help
↑↓ to navigate · Enter to confirm · Esc to cancel```

17) neon · ✔ connected         
18) npx playwright install chromium - without chrom
19) npx playwright install - chrom is opened
19) add mcp playwright server to settings.local.json
20) PROMPT -> open https://www.membrania.eu and add most expensive product to cart and the cheapest product to cart, after addind products to cart close window
21) prompts
22) create folder commands -> merge-and-create-branch.md and close claude code in terminal and run again
run in terminal /merge-and-create-branch with param
23) /merge-and-create-branch edit-workout-page test - click tab  

24) create agents -> /agents


25) 

## Claude Cmds

/config

### Toggle thinking mode
/config -> Thinking mode -> hit option + command + t

### Preferred output style
/config -> Output style


26) Deploy to Vercel - Auth via github cloud
https://vercel.com/

27) install github app
claude
/install-github-app

```   
 ⏺ Both files exist in local commit 6faafb7 but that commit hasn't been pushed to GitHub. Vercel keeps building the old e7a13ef.

You need to push your local main branch to GitHub. Please run:

git push origin main

❯ /install-github-app                                                                                                                                                                                                                                                                             
⎿  GitHub Actions setup complete!```
```

28) Automate GitHub issue fixing with Claude Code GitHub Actions (part 1) -> in github create new issue

29) Add title - if a user logged in and trying to access the main homepage, redirect them to the /dashboard page

Add a comment -> choose @claude
set @claude implement this.

![Screenshot 2026-03-29 at 15.05.42.png](Screenshot%202026-03-29%20at%2015.05.42.png)
![Screenshot 2026-03-29 at 15.07.17.png](Screenshot%202026-03-29%20at%2015.07.17.png)


30) Create new issue
title: Use shadcn ui button for the sign in and sign up buttons
description: Currently these buttons are rendering as button tags styled eith tailwind css, but they should be rendering as shadcn ui buttons instead

@claude fix this issue.

31) Create new issue
title: Mark the entire site dark mode
   
@claude implement this

32)  Create new issue
title: Make the workouts clickable on the /dashboard page
description: Each workout must be a link navigates the user to /dashboard/workout/[workoutid]

@claude fix this issue

33)  Create new issue
     title: Change title header
     description: Change title header Lifting Diary to red color, use shadcn color

@claude implement this

34) Create new issue
    Task: Implement Global Dark Mode

description: 
```
Task: Implement Global Dark Mode
Description
Implement a global dark mode for the entire application (Next.js + shadcn/ui), including:

A theme switcher supporting light / dark / system modes
Persistent user preference (e.g. via localStorage)
Proper SSR handling to avoid flickering (FOUC)
Full compatibility across all UI components
Requirements
Use next-themes for theme management
Configure Tailwind with darkMode: "class"
Ensure <html> includes suppressHydrationWarning
Apply theme classes globally (class="dark")
All components must support both light and dark variants
Acceptance Criteria
User can switch between light, dark, and system themes
Selected theme persists after page reload
No visual flicker during initial page load
All pages and components correctly reflect the selected theme
Compatible with shadcn/ui components
Notes
Follow shadcn/ui theming conventions
Prefer CSS variables (--background, --foreground)
Ensure accessibility (contrast, readability)
```

35) mkdir -p ~/.claude/commands -> global/shared folder
36) create file ~/.claude/commands/personal/commit.md
Generate a commit message based on the changes within the current branch. The commit message must be short and
to-the-point and provide a summary of the changes. Then commit those changes to the current branch.
37) Open visual code
mkdir -p ~/.claude/commands/personal
cd /Users/ivovosahlik/.claude/commands/personal && code .

/commit
/personal:commit

38) add command branch.md
    /branch feature ABC-77 Improve UI

39) at least you want full automatic pipeline

/task-run

you must use: plná automatizace
```
claude --dangerously-skip-permissions
```

40) SAFE mode → nic se nespouští (jen generuje příkazy)
    AUTO mode → příkazy se rovnou vykonají
/push safe   → jen vypíše git push
/push auto   → provede push


41) AI autonomous agent - použitelný setup (cron + worker + Claude CLI workflow)

42) /gh-task-start.md
⏺ Done. Issue moved to In Progress:

- Issue: #19
- Title: Change title header
- Status: Backlog to -> In Progress     

43) https://skills.sh/
/skill-creator

## superpowers
https://github.com/obra/superpowers
https://claude.com/plugins/superpowers
https://claude.com/plugins

## https://skills.sh/anthropics/skills/skill-creator
npx skills add https://github.com/anthropics/skills --skill skill-creator

## https://skills.sh/anthropics/skills/skill-creator
### add skills
npx skills add https://github.com/anthropics/skills --skill skill-creator

44) Tasks
/tasks ->   Background tasks    -> npm run dev        -> x is close/kill/exit beckground task                                                                                                                                                                                                                                                                  

Shell details

Status: running
Runtime: 22s
Command: npm run dev

Output:
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ > liftingdiaryapp@0.1.0 dev                                                                                                                                                                                                                                                              │
│ > next dev                                                                                                                                                                                                                                                                               │
│ ▲ Next.js 16.2.1 (Turbopack)                                                                                                                                                                                                                                                             │
│ - Local:         http://localhost:3000                                                                                                                                                                                                                                                   │
│ - Network:       http://192.168.1.206:3000                                                                                                                                                                                                                                               │
│ - Environments: .env.local                                                                                                                                                                                                                                                               │
│ ✓ Ready in 288ms                                                                                                                                                                                                                                                                         │
│                      
  

45) Ollama -> claude code -> https://docs.ollama.com/integrations/claude-code

-> ollama launch claude