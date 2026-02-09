const db = require('../database.js');

//Submit Assignment 
const submitAssignment = (req, res) => {
    const studentId = req.user.id;
    const role = req.user.role;
    const { assignmentId, submissionText } = req.body;

    // check that only students can submit
    if (role !== 'Student') {
        return res.status(403).json({ error: "only Students can submit assignments" });
    }

    if (!assignmentId || !submissionText) {
        return res.status(400).json({ error: "assignment id and text are required" });
    }

    // Check if already submitted 
    db.get('SELECT * FROM submissions WHERE assignmentId = ? AND studentId = ?', [assignmentId, studentId], (err, row) => {
        if (row) {
            return res.status(400).json({ error: "you have already submitted this assignment!" });
        }

        db.get(`SELECT due_date FROM assignments WHERE assignment_id = ?`, [assignmentId], (err, row) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!row) return res.status(404).json({ error: "Assignment not found" });

            //Check deadline
            const dueDate = new Date(row.due_date);
            const now = new Date();

            if (now > dueDate) {
                return res.status(400).json({ error: "Deadline has passed. Submission rejected." }); 
            }

            // Save Submission
            const sql = `INSERT INTO submissions (submissionText, assignmentId, studentId) VALUES (?, ?, ?)`;
            
            db.run(sql, [submissionText, assignmentId, studentId], function(err) {
                if (err) {
                    console.log("SUBMISSION ERROR:", err.message);
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(201).json({ message: "assignment submitted successfully" });
            });
        });
    });
};

//staff view submissions
const getSubmissions = (req, res) => {
    const { assignmentId } = req.params;

    if (req.user.role !== 'Staff') {
        return res.status(403).json({ error: "only Staff can view submissions" });
    }

    const sql = `
        SELECT submissions.id, submissions.submissionText, submissions.submittedAt, users.name as studentName 
        FROM submissions 
        JOIN users ON submissions.studentId = users.id 
        WHERE assignmentId = ?
    `;

    db.all(sql, [assignmentId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

//grade submission
const gradeSubmission = (req, res) => {
    const { submissionId, grade, feedback } = req.body;

    if (req.user.role !== 'Staff') {
        return res.status(403).json({ error: "only staff can grade" });
    }

    const sql = `UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?`;

    db.run(sql, [grade, feedback, submissionId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "gradded successfully" });
    });
};

//check submsion for students
const getMySubmission = (req, res) => {
    const studentId = req.user.id;
    const { assignmentId } = req.params;

    const sql = `SELECT * FROM submissions WHERE studentId = ? AND assignmentId = ?`;

    db.get(sql, [studentId, assignmentId], (err, row) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (!row) return res.json({ message: "no submission " });
        res.json(row);
    });
};

module.exports = { submitAssignment, getSubmissions, gradeSubmission, getMySubmission };