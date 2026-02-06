const express = require('express');
const app = express();
require('dotenv').config();

//middleware
app.use(express.json());

const db = require('./database');
const { register, login } = require('./controller/authController');
const { createClassroom, joinClassroom } = require('./controller/classroomController');
const verifyToken = require('./middleware/authMiddleware');
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})