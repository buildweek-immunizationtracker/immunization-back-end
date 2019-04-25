const express = require('express');
const router = express.Router();
const { getHistory, getPatient } = require('../../data/helpers');

router.get('/:id/history', async (req, res) => {
    try {
        const { id } = req.params;
        const history = await getHistory(id);
        if(!history.length){
            const [patientCheck] = await getPatient(id);
            if (!patientCheck) return res.status(404).json({ error: 'No patient found with that ID.' });
        }
        res.json({ history });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;