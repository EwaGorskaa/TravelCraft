const jwt = require('jsonwebtoken');

function tokenVerification(req, res, next){
    let token = req.headers['x-access-token'];
    if (!token){
        res.status(403).send({ message: 'Missing token to authorize :('});
    }
    jwt.verify(token, process.env.JWT_KEY, (error, decodeuser) =>
    {
        if(error){
            res.status(401).send({ message:"unauthorized :("});
        }
        req.user = decodeuser;
        next();
    })
}

module.exports = tokenVerification;