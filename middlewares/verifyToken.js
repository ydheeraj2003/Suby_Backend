
const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secretkey = process.env.WhatIsYourName;

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer token
    
    if (!token) {
        return res.status(401).json({ error: "token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretkey);
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(404).json({ error: "vendor not found" });
        }
        req.vendorId = vendor._id;
        next();
    } catch (err) {
        
        console.error('Error verifying token:', err);
        return res.status(500).json({ error: "error verifying token" });
    }
};

module.exports = verifyToken;
