const db = require('../dbConfig');

module.exports = {
    getUsers,
    getUserByUsername,
    addUser,
    getPatientsByUser,
    getPermittedProviders,
};

function getUsers() {
    return db('users');
}

function getUserByUsername(username) {
    return db('users').where({ username });
}

function addUser(user) {
    return db('users').insert(user);
}

function getPatientsByUser(id) {
    // User ID
    return db('patients').where({ 'patients.userId': id });
}

function getPermittedProviders(id) {
    // User ID
    return db('users')
    .where({ 'users.id': id })
    .join('permissions', { 'users.id': 'permissions.userId' })
    .join('providers', { 'permissions.providerId': 'providers.id' })
    .select('providers.name');
}
