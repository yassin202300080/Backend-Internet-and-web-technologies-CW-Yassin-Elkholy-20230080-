const express = require('express');
const app = express();

//middleware
app.use(express.json());

const db = require('./database');
app.get('/', (req, res) => {
    res.json({ message: "FlashEdu backend  running" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})