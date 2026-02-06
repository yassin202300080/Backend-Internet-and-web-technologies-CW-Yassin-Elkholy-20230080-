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
};

module.exports = { createClassroom };