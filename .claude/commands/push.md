Push current branch to remote.

Steps:

1. Get current branch name:
   git branch --show-current

2. Push branch:

   git push -u origin <branch>

3. If branch already exists remotely:

    * push normally:
      git push

4. Return:

* branch name
* push status

Rules:

* Do not force push unless explicitly requested
* Ensure branch exists before pushing
