const db = require('../dbConfig');

module.exports = {
    getPatient,
    getHistory,
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
    'immunizations.name as immunization_name',
    'PI.appointmentDate as appointment_date'
    );
}