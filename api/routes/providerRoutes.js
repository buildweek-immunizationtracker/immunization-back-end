const express = require('express');
const router = express.Router();
const {
  getProviders,
  getProvider,
  getUser,
  updateProvider,
} = require('../../data/helpers');

router.get('/', async (req, res) => {
  try {
    const providers = await getProviders();
    res.json({ providers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const providerId = req.params.id;
    const [provider] = await getProvider(providerId);
    if (!provider)
      return res.status(404).json({ error: 'No provider found with that ID.' });
    res.json({ provider });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userId = req.decoded.id;
    const providerId = req.params.id;
    const user = await getUser(userId);
    if (user.providerId !== providerId)
      return res.status(403).json({ error: 'Unauthorized' });
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ error: 'Please provide updated information in request body.' });
    const [success] = await updateProvider(providerId, { name });
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
