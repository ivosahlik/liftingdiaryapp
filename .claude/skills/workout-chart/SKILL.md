---
name: workout-chart
description: >
  Generates a monthly workout frequency bar chart (PNG) from the project's PostgreSQL database.
  Use this skill whenever the user asks to visualize workout data, chart workout history, plot workout
  frequency, see how many workouts they did per month, or export a workout statistics image.
  Trigger even if the user just says "show me my workout stats" or "how many times did I work out this year".
---

# Workout Chart

Generate a bar chart showing the number of workouts per month for the past 12 months.
The chart is saved as a PNG image in the project root.

## Steps

1. **Find the project root** — the directory containing `.env.local` (or `.env`).

2. **Read the DATABASE_URL** — open `.env.local` and extract the `DATABASE_URL` value.
   It will be a PostgreSQL connection string (starts with `postgresql://` or `postgres://`).

3. **Run the bundled script** — the script lives next to this file at `scripts/generate_chart.py`.
   Pass the DATABASE_URL as the first argument and an output path as the second:

   ```bash
   python3 scripts/generate_chart.py "<DATABASE_URL>" "<project_root>/workout_chart.png"
   ```

   The script auto-installs `psycopg2-binary`, `matplotlib`, and `python-dateutil` if they are
   missing, so no manual dependency setup is needed. Let it run — it may take a few seconds the
   first time if packages need to be downloaded.

4. **Report the result** — tell the user where the image was saved and print the total workout
   count for the past year. If the database returned zero rows, say so clearly and suggest they
   may want to check that the `workouts` table has data with a `startedAt` timestamp in the past
   12 months.

## Schema reference

The relevant table is `workouts`:

| column       | type      | notes                        |
|--------------|-----------|------------------------------|
| id           | integer   | primary key                  |
| userId       | varchar   | Clerk user ID                |
| name         | varchar   | workout name                 |
| startedAt    | timestamp | used for monthly grouping    |
| completedAt  | timestamp | nullable                     |

The script groups by `EXTRACT(YEAR FROM "startedAt")` and `EXTRACT(MONTH FROM "startedAt")`.

## Troubleshooting

- **SSL errors**: the Neon connection string already includes `sslmode=require` — psycopg2
  handles this automatically.
- **Import errors after auto-install**: if the script fails even after installing deps, the user
  may need to run `pip3 install psycopg2-binary matplotlib python-dateutil` manually.
- **Permission errors writing the PNG**: fall back to writing to `/tmp/workout_chart.png` and
  tell the user the alternate path.
