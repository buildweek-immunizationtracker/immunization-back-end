const db = require('../dbConfig');

module.exports = {
  getPatient,
  getHistory,
  getPermittedProviders,
};

function getPatient(id) {
  // Patient ID
  return db('patients').where({ id });
}

function getHistory(id) {
  // Patient ID
  return db('patients')
    .where({ 'patients.id': id })
    .join('patient_immunizations as PI', { 'patients.id': 'PI.patientId' })
    .join('immunizations', { 'immunizations.id': 'PI.immunizationId' })
    .select(
      'immunizations.id as immunization_id',
      'immunizations.name as immunization_name',
      'immunizations.providerId as provider_id', // Could also join providers table to supply provider name
      'PI.appointmentDate as appointment_date'
    );
}

function getPermittedProviders(id) {
  // Patient ID
  return db('patients')
    .where({ 'patients.id': id })
    .join('permissions', { 'patients.id': 'permissions.patientId' })
    .join('providers', { 'permissions.providerId': 'providers.id' })
    .select('providers.name');
}
