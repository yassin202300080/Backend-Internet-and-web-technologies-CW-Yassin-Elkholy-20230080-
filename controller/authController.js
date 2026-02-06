// Import database 
const db = require('../database.js');
//hashing passwords
const bcrypt = require('bcryptjs'); 

const jwt = require('jsonwebtoken'); 
const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//handle user registration
const register = (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    //Hash the password 
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: "Error securing password" });
        }

        //Insert new user into the database
        const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        const params = [name, email, hashedPassword, role];

        db.run(sql, params, function(err) {
            if (err) {
                return res.status(400).json({ error: "Email already exists or error occured" });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    });
};

//login
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, user) => {
        if (err) return res.status(500).json({ error: "server error" });
        
        if (!user) return res.status(404).json({ error: "User not found" });
        
};
module.exports = { register, login };
