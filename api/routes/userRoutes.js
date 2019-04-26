const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
  getPatientsByUser,
} = require('../../data/helpers');

router.get('/', async (req, res) => {
  try {
    const [id] = req.decoded.id;
    const [result] = await getUser(id);
    const { password, ...user } = result;
    if (!user.providerId) delete user.providerId;
    return res.json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/', async (req, res) => {
  try {
    const [id] = req.decoded.id;
    const { username, password, email } = req.body;
    const keysToUpdate = {};
    if (!username && !password && !email)
      return res
        .status(400)
        .json({ error: 'Please provide key to update on user.' });
    if (username) keysToUpdate.username = username;
    if (password) keysToUpdate.password = bcrypt.hashSync(password, 10);
    if (email) keysToUpdate.email = email;
    const numberOfUpdated = await updateUser(id, keysToUpdate);
    if (!numberOfUpdated)
      return res.status(404).json({
        error:
          'No user with that ID found.  Please reauthenticate and try again.',
      });
    const [success] = await getUser(id);
    delete success.password;
    if (!success.providerId) delete success.providerId;
    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const [id] = req.decoded.id;
    const usersDeleted = await deleteUser(id);
    if (!usersDeleted)
      return res.status(404).json({
        error:
          'No user by that ID found.  Please reauthenticate and try again.',
      });
    res.json({ usersDeleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/patients', async (req, res) => {
  try {
    const { id } = req.params;
    const patients = await getPatientsByUser(id);
    if (!patients.length)
      return res.status(404).json({ error: 'No user with that ID found.' });
    res.json({ patients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
