Push current branch.

Input:

* mode (safe | auto), default = safe

Steps:

1. Get current branch:
   git branch --show-current

2. Prepare commands:

   git push -u origin <branch>

3. If mode = safe:

   * Return ONLY command to execute

4. If mode = auto:

   * Execute command

5. Return:

* branch
* status

Rules:

* Never force push unless explicitly requested
