[prompt 1 / default mode]:
is it possible to launch the sign in and sign up with clerk via a modal? do not make any updates to the code.

[prompt 1.1 / default mode]:

- add button style to Sign in and Sign up and move to right side

[prompt 1.2 / default mode]:

- add "Lifting Diary"  on the left, with the auth buttons on the right.

[prompt 2 / edit mode]:
implement these changes to the signinbutton and signupbutton

[prompt 2 / edit mode]:
install drizzle into the project using the folloving documentation: DRIZZLE.md

[prompt 3 / plan mode]:
this is a workout logging app. plan a table schema to log workouts, each workout can have multiple exercises, and each
exercise can have multiple sets. make sure this is normalized. the schema must be created using drizzle orm for a
postgres db hosted on neon.

[prompt 4 / plan mode]:
this plan looks good, it just needs a few tweaks. add a started_at and completed_at column for the workouts table. also
remove the notes and duration.

[prompt 5 / plan mode]:
for the exercises table remove the description, muscle_groups, equipment_type, but add a created_at and updated_at
column. for the workout_exercises table rename the oder_in_workout to order, remove the notes, and add a created_at
column. for the sets table remove the rpe, rest_time and notes, but add a created_at column.