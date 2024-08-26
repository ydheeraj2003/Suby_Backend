const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, (req, res) => {
    res.json({ success: true });
});

module.exports = router;
