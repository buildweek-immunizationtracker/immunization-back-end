const knex = require('knex');
const config = require('../knexfile');
const environment = process.env.DB_ENV || 'development';
const db = knex(config[environment]);

module.exports = {
    getUsers,
    getPatientsByUser,
    getPatient,
    getHistory,
};

function getUsers(){ // User ID
    return db('users');
}

function getPatientsByUser(id){ // User ID
    return db('patients')
        .where({ 'patients.userId': id });
}

function getPatient(id){ // Patient ID
    return db('patients')
        .where({ id });
}

function getHistory(id){ // Patient ID
    return db('patients')
        .where({ 'patients.id': id })
        .join('patient_immunizations as PI', { 'patients.id': 'PI.patientId' })
        .join('immunizations', { 'immunizations.id': 'PI.immunizationId' })
        .select('immunizations.name as immunization_name', 'PI.appointmentDate as appointment_date');
    }