const db = require('../dbConfig');

module.exports = {
    getProviders,
    addProvider,
};

function getProviders(){
    return db('providers');
}

function addProvider(name){
    return db('providers').returning('id').insert({ name });
}