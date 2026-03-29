Create branch from issue.

Input:

* issue number
* title

Steps:

1. Convert title to kebab-case

2. Create branch:
   feature/<issue-number>-<kebab-title>

3. Run:
   git checkout -b <branch>

Return:

* branch name
