const express = require('express');
const router = express.Router();
const {
  getUser,
  getPatient,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} = require('../../data/helpers');

router.get('/', async (req, res) => {
  try {
    const userId = req.decoded.id;
    const patients = await getPatients(userId);
    res.json({ patients });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

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
    const user = await getUser(userId);
    if (!user)
      return res.status(404).json({ error: 'No user found with that ID.' });
    const newPatient = {
      firstName,
      lastName,
      birthDate,
      userId,
    };
    const [patientId] = await addPatient(newPatient); // With Postgres, output will be user object instead of just id.
    const [success] = await getPatient(patientId);
    res.status(201).json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const patient = req.patient;
    res.json({ patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const patient = req.patient;
    const { firstName, lastName, birthDate } = req.body;
    const keysToUpdate = {};
    if (firstName) keysToUpdate.firstName = firstName;
    if (lastName) keysToUpdate.lastName = lastName;
    if (birthDate) keysToUpdate.birthDate = birthDate;
    const success = await updatePatient(patient.id, keysToUpdate);
    res.json({ success });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const patient = req.patient;
    const numberDeleted = await deletePatient(patient.id);
    if (!numberDeleted) 
      return res.status(404).json({ error: 'No patient with that ID found.' });
    res.json({ numberDeleted });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
