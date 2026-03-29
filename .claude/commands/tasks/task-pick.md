Select next issue from GitHub Project Backlog.

Steps:

1. Fetch issues from Backlog column

2. Select highest priority / first issue

3. Extract:

    * issue number
    * title
    * description

4. Move issue to "In Progress":
   gh project item-edit --id <item-id> --field-status "In Progress"

Return:

* issue number
* title
* description
