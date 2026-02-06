const db = require('../database.js');

//Create Assignment
const createAssignment = (req, res) => {
    const { title, description, dueDate, classCode } = req.body;
    
    //check only for staff
    if (req.user.role !== 'Staff') {
        return res.status(403).json({ error: "Only Staff can create assignments!" });
    }

    if (!title || !dueDate || !classCode) {
        return res.status(400).json({ error: "Title, Due Date, and Class Code are required" });
    }

    //find  Classroom id using the class Code
    db.get('SELECT id FROM classrooms WHERE classCode = ?', [classCode], (err, classroom) => {
        if (err || !classroom) {
            return res.status(404).json({ error: "Classroom not found" });
        }

        //save assignemnt
        const sql = `INSERT INTO assignments (title, description, dueDate, classroomId) VALUES (?, ?, ?, ?)`;
        
        db.run(sql, [title, description, dueDate, classroom.id], function(err) {
            if (err) return res.status(500).json({ error: "Database error" });
            
            res.status(201).json({ message: "assignment created successfully" });
        });
    });
};

const getAssignments = (req, res) => {
    const sql = `SELECT * FROM assignments`;
    
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows);
    });
};

module.exports = { createAssignment, getAssignments };
