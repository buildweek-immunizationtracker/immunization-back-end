const db = require('../dbConfig');

module.exports = {
  ...require('./users'),
  ...require('./patients'),
};