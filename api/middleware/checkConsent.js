const {
  getUser,
  getPatient,
  getPermittedProviders,
} = require('../../data/helpers');

async function checkConsent(req, res, next) {
  const userId = req.decoded.id;
  const patientId = req.params.id;
  const user = await getUser(userId);
  const [patient] = await getPatient(patientId);
  const permittedProviders = await getPermittedProviders(patientId);
  if (!patient)
    return res.status(404).json({ error: 'No patient by that ID found.' });
  if (
    patient.userId === userId ||
    permittedProviders.map(provider => provider.id).includes(user.providerId)
  ) {
    req.patient = patient;
    if (user.providerId) req.providerId = user.providerId;
    return next();
  } else res.status(403).json({ error: 'Unauthorized' });
}

module.exports = checkConsent;
