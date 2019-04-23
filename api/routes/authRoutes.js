const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: 'Request must include values for username and password.' });
    // Use helper function to find user and bcrypt to compare password hashes.
});

router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email)
        return res.status(400).json({ error: 'Request must include values for username, password, and email keys.' });
    const credentials = { username, password, email };
    const hash = bcrypt.hashSync(credentials.password, 10);
    credentials.password = hash;
    if (role !== undefined) credentials.role = role;
    // Use helper function for register
});

module.exports = router;