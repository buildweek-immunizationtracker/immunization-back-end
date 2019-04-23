const jwt = require('jsonwebtoken');

const jwtKey = 
    process.env.JWT_SECRET 
    || 'The woods are lovely, dark and deep, But I have promises to keep, And miles to go before I sleep, And miles to go before I sleep.';

function authenticate(req, res, next){
    try {
        const header = req.get('Authorization');
        if (header){
            const token = header.split(' ')[1];
            const decoded = jwt.verify(token, jwtKey); // Will throw error if not successful
            req.decoded = decoded;
            next();
        }
        res.status(401).json({ error: 'Token must be set on Authorization header.' });
    } catch(error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = authenticate;