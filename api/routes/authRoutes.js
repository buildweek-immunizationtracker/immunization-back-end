const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');
const { getUserByUsername, addUser } = require('../../data/helpers');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        error: 'Request must include values for username and password.',
      });
    const [user] = await getUserByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.password))
      throw new Error();
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1d' });
    return res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, providerId } = req.body;
    if (!username || !password || !email)
      return res.status(400).json({
        error:
          'Request must include values for username, password, and email keys.',
      });
    const credentials = { username, password, email };
    const hash = bcrypt.hashSync(credentials.password, 10);
    credentials.password = hash;
    credentials.providerId = providerId || null;
    const [id] = await addUser(credentials);
    if (!id) throw new Error();
    const token = jwt.sign({ id }, jwtSecret, { expiresIn: '1d' });
    return res.status(201).json({ token });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      return res
        .status(400)
        .json({ error: 'Email or username already exists.' });
    }
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
