Sync branch with main branch.

Steps:

1. Fetch latest changes:
   git fetch origin

2. Rebase current branch on main:
   git rebase origin/main

3. Resolve conflicts if needed

4. Push updates:
   git push --force-with-lease

Return:

* sync status
* conflicts (if any)
