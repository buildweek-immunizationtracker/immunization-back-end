const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');
const { getUser } = require('../../data/helpers');

async function authenticate(req, res, next) {
  try {
    const header = req.get('Authorization');
    if (header) {
      const token = header.split(' ')[1];
      const decoded = jwt.verify(token, jwtSecret); // Will throw error if not successful
      const user = await getUser(decoded.id);
      if (!user)
        throw new Error(
          'Token not associated with a valid user, please reauthenticate.'
        );
      req.decoded = decoded;
      return next();
    }
    res
      .status(401)
      .json({ error: 'Token must be set on Authorization header.' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = authenticate;
