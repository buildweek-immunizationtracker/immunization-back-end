const db = require('../dbConfig');

async function getPermissions(patientId){
    try {

    } catch(error) {
        return Promise.reject(error);
    }
}

async function giveConsentToProvider(patientId, providerId){
    try {
        const [patient] = await db('patients').where({ id: patientId });
        const [provider] = await db('providers').where({ id: providerId});
        if (!patient || !provider) {
            const errorMessage = `No ${patient ? 'provider' : 'patient'} found with that ID.`;
            throw new Error(errorMessage);
        }
        const success = await db('permissions').insert({ patientId, providerId });
        return success;
    } catch(error) {
        return error;
    }
}