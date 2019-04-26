const db = require('../dbConfig');

module.exports = {
  getPatients,
  getPatient,
  addPatient,
  updatePatient,
  deletePatient,
  getPermittedProviders,
};

// All functions in this file should use parameters based on the `patients` table, such as `patients.id` and `patients.birthDate`
// Any functions making use of data from the `users` table should go in `users.js`

function getPatients(userId){
  return db('patients').where({ userId });
}

async function getPatient(id) {
  return db('patients').where({ id });
}

function addPatient(patient){
  return db('patients')
    .returning(['id', 'firstName', 'lastName', 'birthDate', 'userId', 'createdAt'])
    .insert(patient);
}

function updatePatient(changes){
  return db('patients')
    .returning(['id', 'firstName', 'lastName', 'birthDate', 'userId', 'createdAt'])
    .update(changes);
}

function deletePatient(id){
  return db('patients')
    .where({ id })
    .del();
}

function getPermittedProviders(id) {
  return db('patients')
    .where({ 'patients.id': id })
    .join('permissions', { 'patients.id': 'permissions.patientId' })
    .join('providers', { 'permissions.providerId': 'providers.id' })
    .select('providers.id');
}
