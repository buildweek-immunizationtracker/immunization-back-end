const express = require('express');
const router = express.Router();
const { getUsers, getPatientsByUser } = require('../../data/helpers');

router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.json({ users });
    } catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id/patients', async (req, res) => {
    try {
        const { id } = req.params;
        const patients = await getPatientsByUser(id);
        if(!patients.length) return res.status(404).json({ error: 'No user with that ID found.' })
        res.json({ patients });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;