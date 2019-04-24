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
      return res.status(400).json({
        error: 'Request must include values for username and password.',
      });
    const [user] = await getUserByName(username);
    if (!user || !bcrypt.compareSync(password, user.password))
      throw new Error();
    const token = jwt.sign({ role: user.role }, jwtSecret, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email)
      return res.status(400).json({
        error:
          'Request must include values for username, password, and email keys.',
      });
    const credentials = { username, password, email };
    const hash = bcrypt.hashSync(credentials.password, 10);
    credentials.password = hash;
    credentials.role = role || 0;
    const [id] = await addUser(credentials);
    if (!id) throw new Error();
    const token = jwt.sign({ role: role || 0 }, jwtSecret, { expiresIn: '1d' });
    res.status(201).json({ token });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      res.status(400).json({ error: 'Email or username already exist.' });
    }
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
