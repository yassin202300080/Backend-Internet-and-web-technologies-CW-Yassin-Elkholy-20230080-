const sqlite3 = require('sqlite3').verbose();

//connect to database
const db = new sqlite3.Database('./flashedu.db', (err) => {
    //handle databese error and create tables if not exist

    if (err) console.error('Database error:', err.message);
    else {
        console.log('connected to the database');

        //create users and classrooms table for students and staff
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('Student', 'Staff'))
        )`);

        ////create classrooms table
        // staffId for linking class to the teacher 
        db.run(`CREATE TABLE IF NOT EXISTS classrooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            classCode TEXT UNIQUE NOT NULL,
            className TEXT NOT NULL,
            staffId INTEGER,
            FOREIGN KEY(staffId) REFERENCES users(id)
        )`);

        //enrollment table to link students to classrooms
        db.run(`CREATE TABLE IF NOT EXISTS enrolments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            studentId INTEGER,
            classroomId INTEGER,
            FOREIGN KEY(studentId) REFERENCES users(id),
            FOREIGN KEY(classroomId) REFERENCES classrooms(id),
            UNIQUE(studentId, classroomId)
    )`);
    console.log("database table created");
});

module.exports = db;