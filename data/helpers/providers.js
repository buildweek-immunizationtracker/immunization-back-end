const db = require('../dbConfig');

module.exports = {
    addProvider,
};

function addProvider(name){
    return db('providers').returning('id').insert({ name });
}