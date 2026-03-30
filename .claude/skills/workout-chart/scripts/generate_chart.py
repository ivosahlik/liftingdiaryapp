#!/usr/bin/env python3
"""
Queries the workouts table for the past 12 months and generates a monthly bar chart.
Usage: python generate_chart.py <DATABASE_URL> [output_path]
"""

import sys
import os
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import calendar

def main():
    if len(sys.argv) < 2:
        print("Usage: python generate_chart.py <DATABASE_URL> [output_path]")
        sys.exit(1)

    database_url = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else "workout_chart.png"

    try:
        import psycopg2
    except ImportError:
        print("Installing psycopg2-binary...")
        os.system(f"{sys.executable} -m pip install psycopg2-binary --quiet")
        import psycopg2

    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import matplotlib.ticker as mticker
    except ImportError:
        print("Installing matplotlib...")
        os.system(f"{sys.executable} -m pip install matplotlib --quiet")
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import matplotlib.ticker as mticker

    try:
        from dateutil.relativedelta import relativedelta
    except ImportError:
        print("Installing python-dateutil...")
        os.system(f"{sys.executable} -m pip install python-dateutil --quiet")
        from dateutil.relativedelta import relativedelta

    # Build list of the past 12 months (oldest first)
    today = datetime.today()
    months = []
    for i in range(11, -1, -1):
        d = today - relativedelta(months=i)
        months.append((d.year, d.month))

    # Query the database
    conn = psycopg2.connect(database_url)
    try:
        cur = conn.cursor()
        one_year_ago = today - relativedelta(years=1)
        cur.execute(
            """
            SELECT
                EXTRACT(YEAR  FROM "startedAt")::int AS yr,
                EXTRACT(MONTH FROM "startedAt")::int AS mo,
                COUNT(*)::int                        AS cnt
            FROM workouts
            WHERE "startedAt" >= %s
            GROUP BY yr, mo
            ORDER BY yr, mo
            """,
            (one_year_ago,),
        )
        rows = {(r[0], r[1]): r[2] for r in cur.fetchall()}
    finally:
        conn.close()

    counts = [rows.get(m, 0) for m in months]
    labels = [f"{calendar.month_abbr[m[1]]} {m[0]}" for m in months]

    # Plot
    fig, ax = plt.subplots(figsize=(12, 6))
    bars = ax.bar(labels, counts, color="#4f86c6", edgecolor="white", linewidth=0.5)

    # Annotate bars with count
    for bar, count in zip(bars, counts):
        if count > 0:
            ax.text(
                bar.get_x() + bar.get_width() / 2,
                bar.get_height() + 0.1,
                str(count),
                ha="center",
                va="bottom",
                fontsize=10,
                fontweight="bold",
                color="#333333",
            )

    ax.set_xlabel("Month", fontsize=12, labelpad=10)
    ax.set_ylabel("Number of Workouts", fontsize=12, labelpad=10)
    ax.set_title("Workouts per Month (Past 12 Months)", fontsize=14, fontweight="bold", pad=15)
    ax.yaxis.set_major_locator(mticker.MaxNLocator(integer=True))
    ax.set_ylim(0, max(counts) * 1.2 + 1 if counts else 5)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()

    fig.savefig(output_path, dpi=150, bbox_inches="tight")
    print(f"Chart saved to: {os.path.abspath(output_path)}")
    print(f"Total workouts in past year: {sum(counts)}")


if __name__ == "__main__":
    main()
