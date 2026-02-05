// Import database 
const db = require('../database.js');
//hashing passwords
const bcrypt = require('bcryptjs'); 

//handle user registration
const register = (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Please provide all fields!" });
    }

module.exports = { register };