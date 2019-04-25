const db = require('../dbConfig');

module.exports = {
  getUsers,
  getUserByUsername,
  addUser,
  getPatientsByUser,
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