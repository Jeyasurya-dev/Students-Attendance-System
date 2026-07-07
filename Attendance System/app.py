from flask import Flask, render_template, request, redirect
import sqlite3
from datetime import date

app = Flask(__name__)

# SQLite Database Connection
db = sqlite3.connect("attendance.db", check_same_thread=False)
cursor = db.cursor()

# Create table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    attendance_status TEXT NOT NULL,
    attendance_date TEXT NOT NULL
)
""")
db.commit()


@app.route('/')
def index():
    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()
    return render_template('index.html', students=students)


@app.route('/add', methods=['POST'])
def add():
    name = request.form['name']
    status = request.form['status']

    cursor.execute(
        "INSERT INTO students (name, attendance_status, attendance_date) VALUES (?, ?, ?)",
        (name, status, str(date.today()))
    )
    db.commit()

    return redirect('/')


@app.route('/delete/<int:id>')
def delete(id):
    cursor.execute("DELETE FROM students WHERE id = ?", (id,))
    db.commit()
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)