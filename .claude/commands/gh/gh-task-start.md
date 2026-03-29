Move first issue from GitHub Project "TestAi" Backlog to "In Progress".

Steps:

1. Get project ID:

   gh project list --owner @me

2. Find project named "TestAI"

3. Get items from project:

   gh project item-list <project-id> --format json

4. Filter:

    * select items with status "Backlog"
    * take the first item

5. Extract:

    * item-id
    * issue number
    * title

6. Move item to "In Progress":

   gh project item-edit
   --id <item-id>
   --field-id <status-field-id>
   --single-select-option-id <in-progress-option-id>

7. Return:

* issue number
* title
* new status = In Progress

Rules:

* If no backlog item exists → return "No tasks in backlog"
* Do not process multiple issues
