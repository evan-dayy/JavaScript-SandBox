const jwt = require('jsonwebtoken');
const config = require('config');


/**
 * However, not every router, and not every request need a auth middleware, 
 * as a result, we should apply this method selectively to required request
 * 
 */
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access Denied, no token provided ...');
    }
    try {
        const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decodedPayload;
        next();
    } catch (e) {
        res.status(400).send('Invalid Token ...');
    }
}

module.exports = auth;