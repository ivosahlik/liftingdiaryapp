Create a git branch from input and generate a commit with a strict format.

Input format:
[type] JIRA-ID description

Where:

* type = feature | bugfix | chore (default: feature)
* JIRA-ID = e.g. ABC-123
* description = free text

Steps:

1. Parse input:

    * Extract type (if missing → use "feature")
    * Extract Jira ID (pattern: [A-Z]+-[0-9]+)
    * Extract description

2. Normalize:

    * Convert description to kebab-case for branch:
      lowercase, replace spaces with hyphens, remove special chars
    * Keep a human-readable description for commit message

3. Map type:

    * feature → feat
    * bugfix → bugfix
    * chore → chore

4. Build branch name:

   <type>/<JIRA-ID>-<kebab-description>

5. Create branch:

   git checkout -b <branch-name>

6. If there are uncommitted changes:

    * stage all changes
    * create commit using format:

      <mapped-type>(<JIRA-ID>-<kebab-description>): <description>

   Example:
   feat(ABC-77-improve-ui): Improve UI

7. Output:

    * branch name
    * commit message used

Examples:

Input:
feature ABC-77 Improve UI

Branch:
feature/ABC-77-improve-ui

Commit:
feat(ABC-77-improve-ui): Improve UI

Input:
bugfix SHOP-9 Fix cart crash

Branch:
bugfix/SHOP-9-fix-cart-crash

Commit:
bugfix(SHOP-9-fix-cart-crash): Fix cart crash
