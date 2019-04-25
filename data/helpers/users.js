const db = require('../dbConfig');

module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUsername,
  addUser,
  getPatientsByUser,
};

function getUser(id){
  return db('users').where({ id });
}

function getUsers() {
  return db('users');
}

function updateUser(id, changes){
  return db('users').where({ id }).update(changes);
}

function deleteUser(id){
  return db('users').where({ id }).del();
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