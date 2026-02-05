const sqlite3 = require('sqlite3').verbose();

//connect to database
const db = new sqlite3.Database('./flashedu.db', (err) => {
    //handle databese error and create tables if not exist

    if (err) console.error('Database error:', err.message);
    else {
        console.log('connected to the database');
    }
});

module.exports = db;