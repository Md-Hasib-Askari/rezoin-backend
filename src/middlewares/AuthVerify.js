const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    let token = req.headers['token'];
    jwt.verify(token, "GiveYourSecretKeyHere", function (err, decoded) {
        if (err) {
            res.status(401).json({status:"unauthorized"})
        } else {
            req.headers.email = decoded['data']
            next();
        }
    })
}