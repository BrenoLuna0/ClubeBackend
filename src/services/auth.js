const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send(false);
    }
    jwt.verify(token, process.env.SECRET, (err,decoded) => {
        if(err){
            return res.status(500).send(false);
        }else{
            next();
        }
    });
}