const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) { return res.status(403).json({ error: "missing token" }); 

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: "Token format incorrect!" });
    }
jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(401).json({ error: "Invalid or expired token!" });
        }
        req.user = decodedUser;
        next();
    });
};

module.exports = verifyToken;