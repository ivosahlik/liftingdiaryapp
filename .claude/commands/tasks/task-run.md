Run full development workflow with checkpoints.

Goal:
Automate task lifecycle with manual confirmations.

Flow:

1. /task-pick
   → STOP: confirm selected issue

2. /task-branch
   → STOP: confirm branch name

3. /task-implement
   → STOP: review generated changes

4. /task-test
   → STOP: ensure tests pass

IF tests fail:
run /task-fix
then /task-test again

5. /task-commit
   → STOP: confirm commit message

6. /task-sync
   → STOP: ensure branch is up-to-date

7. /task-pr
   → STOP: review PR

8. /task-review
   → STOP: review feedback

IF issues found:
run /task-fix
repeat review

9. WAIT for developer approval

10. /task-done

Rules:

* NEVER skip checkpoints
* ALWAYS validate before moving forward
* keep changes minimal

Return:

* final status
* PR link
* task status