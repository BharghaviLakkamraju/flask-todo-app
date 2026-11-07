
from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime, timedelta
import sqlite3

app = Flask(__name__)


# Database connection
def get_db_connection():
    conn = sqlite3.connect("tasks.db")
    conn.row_factory = sqlite3.Row
    return conn


# Initialize database
def init_db():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_name TEXT NOT NULL,
            due_date TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


# Home route
@app.route("/")
def home():
    today = datetime.today().date().isoformat()

    conn = get_db_connection()

    today_tasks = conn.execute(
        "SELECT * FROM tasks WHERE due_date = ?",
        (today,)
    ).fetchall()

    conn.close()

    return render_template(
        "index.html",
        today_tasks=today_tasks,
        tasks_date=today
    )


# Add task route
@app.route("/add_task", methods=["POST"])
def add_task():
    task_name = request.form.get("task_name")
    due_date = request.form.get("due_date")

    if task_name and due_date:
        conn = get_db_connection()

        conn.execute(
            "INSERT INTO tasks (task_name, due_date) VALUES (?, ?)",
            (task_name, due_date)
        )

        conn.commit()
        conn.close()

    return redirect(url_for("calculate", date=due_date))


# Close task route
@app.route("/close_task", methods=["POST"])
def close_task():
    task_id = request.form.get("task_id")
    due_date = request.form.get("due_date")

    if task_id:
        conn = get_db_connection()

        conn.execute(
            "DELETE FROM tasks WHERE id = ?",
            (task_id,)
        )

        conn.commit()
        conn.close()

    return redirect(url_for("calculate", date=due_date))


# Calculate / display selected date
@app.route("/calculate", methods=["POST", "GET"])
def calculate():
    date = request.values.get("date")

    if not date:
        date = datetime.today().date().isoformat()

    if date == "today":
        tasks_date = datetime.today().date().isoformat()

    elif date == "tomorrow":
        tomorrow = datetime.today().date() + timedelta(days=1)
        tasks_date = tomorrow.isoformat()

    else:
        tasks_date = date

    conn = get_db_connection()

    today_tasks = conn.execute(
        "SELECT * FROM tasks WHERE due_date = ?",
        (tasks_date,)
    ).fetchall()

    conn.close()

    return render_template(
        "index.html",
        today_tasks=today_tasks,
        tasks_date=tasks_date
    )


if __name__ == "__main__":
    init_db()
    app.run(debug=True, host="0.0.0.0")
