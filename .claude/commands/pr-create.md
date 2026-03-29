Create a pull request from current branch.

Steps:

1. Get current branch name
2. Generate PR title
3. Generate PR description
4. Run:

git push -u origin <branch>
gh pr create --title "<title>" --body "<description>"

Return:

* PR title
* PR description
* confirmation

Requirements:

* GitHub CLI (gh) installed
