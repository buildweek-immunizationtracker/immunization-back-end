const knex = require('knex');
const config = require('../knexfile');
const environment = process.env.DB_ENV || 'development';
const db = knex(config[environment]);

module.exports = {
  getUsers,
  getUserByName,
  addUser,
  getPatientsByUser,
  getPatient,
  getHistory,
  getPermittedProviders,
};

function getUsers() {
  // User ID
  return db('users');
}

function getUserByName(username) {
  return db('users').where({ username });
}

function addUser(user) {
  return db('users').insert(user);
}

function getPatientsByUser(id) {
  // User ID
  return db('patients').where({ 'patients.userId': id });
}

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
      'immunizations.name as immunization_name',
      'PI.appointmentDate as appointment_date'
    );
}

function getPermittedProviders(id) {
  // User ID
  return db('users')
    .where({ 'users.id': id })
    .join('permissions', { 'users.id': 'permissions.userId' })
    .join('providers', { 'permissions.providerId': 'providers.id' })
    .select('providers.name');
}
