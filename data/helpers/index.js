module.exports = {
  ...require('./users'),
  ...require('./patients'),
  ...require('./permissions'),
  ...require('./immunizations'),
  ...require('./patient_immunizations'),
};