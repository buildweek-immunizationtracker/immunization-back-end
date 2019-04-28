const express = require('express');
const router = express.Router();
const {
  getUser,
  getPatient,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getPatientsForProvider,
  getPermittedProviders,
  giveConsentToProvider,
  removeConsentFromProvider,
  getImmunizationRecords,
  recordImmunization,
} = require('../../data/helpers');

router.get('/', async (req, res) => {
  try {
    const userId = req.decoded.id;
    const user = await getUser(userId);
    let patients;
    if (user.providerId)
      patients = await getPatientsForProvider(user.providerId);
    else patients = await getPatients(userId);
    res.json({ patients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { firstName, lastName, birthDate } = req.body;
    if (!firstName || !lastName || !birthDate)
      return res.status(400).json({
        error:
          'Request must include values for firstName, lastName, and birthDate keys.',
      });
    const user = await getUser(userId);
    if (!user)
      return res.status(404).json({ error: 'No user found with that ID.' });
    if (user.providerId)
      return res.status(403).json({
        error:
          'Patients cannot be directly associated with a provider account.',
      });
    const newPatient = {
      firstName,
      lastName,
      birthDate,
      userId,
    };
    const [patient] = await addPatient(newPatient); // With Postgres, output will be user object instead of just id.
    const [success] = await getPatient(patient.id);
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
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/consent', async (req, res) => {
  try {
    const id = req.decoded.id;
    const patient = req.patient;
    if (id !== patient.userId)
      return res.status(403).json({ error: 'Unauthorized' });
    const providers = await getPermittedProviders(patient.id);
    res.json({ providers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/consent', async (req, res) => {
  try {
    const id = req.decoded.id;
    const patient = req.patient;
    const { providerId } = req.body;
    if (id === patient.userId) {
      const success = await giveConsentToProvider(patient.id, providerId);
      return res.status(201).json({ success });
    } else res.status(403).json({ error: 'Unauthorized' });
  } catch (error) {
    if (error.message === 'Provider already has consent.') res.status(400);
    else res.status(500);
    res.json({ error: error.message });
  }
});

router.delete('/:id/consent', async (req, res) => {
  try {
    const id = req.decoded.id;
    const patient = req.patient;
    const { providerId } = req.body;
    if (id === patient.userId) {
      const numberDeleted = await removeConsentFromProvider(
        patient.id,
        providerId
      );
      if (!numberDeleted)
        return res
          .status(400)
          .json({ error: 'Provider does not currently have consent.' });
      return res.status(200).json({ success: 'Consent removed successfully.' });
    } else res.status(403).json({ error: 'Unauthorized' });
  } catch (error) {
    if (error.message.includes('found with that ID.')) res.status(404);
    else res.status(500);
    res.json({ error: error.message });
  }
});

router.get('/:id/immunizations', async (req, res) => {
  try {
    const { id } = req.params;
    const history = await getImmunizationRecords(id);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/immunizations', async (req, res) => {
  try {
    const patientId = req.params.id;
    const providerId = req.providerId;
    if (!providerId)
      return res
        .status(403)
        .json({ error: 'Immunziation records must be added by provider.' });
    const { immunizationId, appointmentDate } = req.body;
    const [success] = await recordImmunization({
      patientId,
      immunizationId,
      appointmentDate,
      providerId,
    });
    res.status(201).json({ success });
  } catch (error) {
    if (error.message.includes('violates foreign key constraint')) {
      const type = error.message.match(/(?<=_)[a-zA-Z]+(?=_foreign"$)/)[0];
      return res
        .status(404)
        .json({ error: `No entry found in database with matching ${type}.` });
    }
    if (error.message.includes('UNIQUE constraint'))
      return res
        .status(400)
        .json({ error: 'This record has already been added.' });
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
