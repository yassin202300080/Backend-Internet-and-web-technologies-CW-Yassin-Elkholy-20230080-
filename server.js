const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

//middleware
app.use(express.json());
app.use(cors());

const db = require('./database');
const { register, login } = require('./controller/authController');
const { createClassroom, joinClassroom } = require('./controller/classroomController');
const verifyToken = require('./middleware/authMiddleware');
const { createAssignment, getAssignments } = require('./controller/assignmentController');
const { submitAssignment, getSubmissions, gradeSubmission, getMySubmission } = require('./controller/submissionController');
console.log('Register function imported:', typeof register);

app.get('/', (req, res) => {
    res.json({ message: "FlashEdu backend  running" });
});

// Create route 
app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/classrooms', verifyToken, createClassroom);
app.post('/api/classrooms/join', verifyToken, joinClassroom);
console.log('Route /api/register registered');
app.post('/api/assignments', verifyToken, createAssignment);
app.get('/api/assignments', verifyToken, getAssignments);
app.post('/api/submissions', verifyToken, submitAssignment);
app.get('/api/assignments/:assignmentId/submissions', verifyToken, getSubmissions);
app.get('/api/assignments/:assignmentId/submission', verifyToken, getMySubmission);
app.post('/api/submissions/grade', verifyToken, gradeSubmission);
app.get('/api/classrooms', verifyToken, getMyClassrooms);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})