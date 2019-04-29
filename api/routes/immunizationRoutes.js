const express = require('express');
const router = express.Router();
const { getImmunizations } = require('../../data/helpers');

router.get('/', async (req, res) => {
    try {
        const immunizations = await getImmunizations();
        res.json({ immunizations });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;