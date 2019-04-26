const express = require('express');
const router = express.Router();
const {
  getUser,
  getHistory,
  getPatient,
  addPatient,
} = require('../../data/helpers');

router.post('/', async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { firstName, lastName, birthDate } = req.body;
    if (!firstName || !lastName || !birthDate)
      return res
        .status(400)
        .json({
          error:
            'Request must include values for firstName, lastName, and birthDate keys.',
        });
    const [user] = await getUser(userId);
    if (!user)
      return res.status(404).json({ error: 'No user found with that ID.' });
    const newPatient = {
      firstName,
      lastName,
      birthDate,
      userId,
    };
    const [patientId] = await addPatient(newPatient);
    const [success] = await getPatient(patientId);
    res.status(201).json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/history', async (req, res) => {
  try {
    const { id } = req.params;
    const history = await getHistory(id);
    if (!history.length) {
      const [patientCheck] = await getPatient(id);
      if (!patientCheck)
        return res
          .status(404)
          .json({ error: 'No patient found with that ID.' });
    }
    res.json({ history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/permissions', async (req, res) => {
  try {
    const { id } = req.params;
    const providers = await getPermittedProviders(id);
    res.json({ id, providers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
