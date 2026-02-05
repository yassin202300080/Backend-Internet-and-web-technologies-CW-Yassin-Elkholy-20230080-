// Import database 
const db = require('../database.js');
//hashing passwords
const bcrypt = require('bcryptjs'); 

//handle user registration
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
module.exports = { register };