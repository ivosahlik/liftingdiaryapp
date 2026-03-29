Finalize task after approval.

Steps:

1. Merge PR:
   gh pr merge --auto --squash

2. Move issue to Done:
   gh project item-edit --id <item-id> --field-status "Done"

3. Deploy:

    * run deployment command or CI/CD

Return:

* merged PR
* issue marked as Done
* deployment triggered
