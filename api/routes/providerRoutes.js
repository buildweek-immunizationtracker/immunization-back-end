const express = require('express');
const router = express.Router();
const { getProviders } = require('../../data/helpers');

router.get('/', async (req, res) => {
    try {
        const providers = await getProviders();
        res.json({ providers })
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;