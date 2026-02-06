const db = require('../database.js');

//create a class
const createClassroom = (req, res) => {
    const staffId = req.user.id;
    const userRole = req.user.role;

    const { className } = req.body;
    
    //check if user is staff 
    if (userRole !== 'Staff') {
        return res.status(403).json({ error: "Only Staff can create a classrooms" });
    }

    if (!className) {
        return res.status(400).json({ error: "Class Name is required" });
    }

    //creaing unique class code
    const classCode = Math.random().toString(36).substring(2, 7).toUpperCase();

    const sql = `INSERT INTO classrooms (classCode, className, staffId) VALUES (?, ?, ?)`;
    
    db.run(sql, [classCode, className, staffId], function(err) {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ 
            message: "Classroom created!", 
            classCode: classCode 
        });
    });
};

//join classroom for students 
const joinClassroom = (req, res) => {
    const studentId = req.user.id;
    const role = req.user.role;
    const { classCode } = req.body;

    if (role !== 'Student') {
        return res.status(403).json({ error: "Only Students can join classrooms!" });
    }

module.exports = { createClassroom };