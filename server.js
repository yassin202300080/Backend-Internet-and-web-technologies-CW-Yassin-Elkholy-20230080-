const express = require('express');
const app = express();
require('dotenv').config();

//middleware
app.use(express.json());

const db = require('./database');
const { register, login } = require('./controller/authController');

console.log('Register function imported:', typeof register);

app.get('/', (req, res) => {
    res.json({ message: "FlashEdu backend  running" });
});

// Create route 
app.post('/api/register', register);
app.post('/api/login', login);
console.log('Route /api/register registered');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})