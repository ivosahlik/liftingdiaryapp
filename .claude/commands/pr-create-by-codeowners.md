Create a pull request from current branch using CODEOWNERS for automatic reviewer assignment.

Steps:

1. Get current branch name

2. Generate:

    * PR title
    * PR description

3. Push branch:

   git push -u origin <branch>

4. Create PR:

   gh pr create --title "<title>" --body "<description>"

5. Do NOT manually assign reviewers.

    * Reviewers will be automatically assigned using CODEOWNERS

6. Return:

* PR title
* PR description
* confirmation that CODEOWNERS will assign reviewers
* PR link

Requirements:

* GitHub CLI (gh)
* CODEOWNERS file present in repository
