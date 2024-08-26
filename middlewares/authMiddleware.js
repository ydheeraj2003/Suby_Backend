const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer token

    if (token == null) return res.sendStatus(401); // No token found

    jwt.verify(token, process.env.WhatIsYourName, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Attach user info to request
        next();
    });
};

module.exports = authenticateToken;
