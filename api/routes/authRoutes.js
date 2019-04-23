const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');
const { getUserByName, addUser } = require('../../data/helpers');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: 'Request must include values for username and password.' });
        const [user] = await getUserByName(username);
        if (!user || !bcrypt.compareSync(password, user.password)) throw error;
        const token = jwt.sign({ role: user.role }, jwtSecret);
        res.json({ token });
    } catch(error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
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