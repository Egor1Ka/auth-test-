const jwt = require('jsonwebtoken')
const {secret} = require("../config")

module.exports = function(req,res,next){
    if(req.method ==='OPTIONS'){
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            res.status(403).json({message:'user not authorization'})
        }

        const decodeData = jwt.verify(token,secret)
        req.user = decodeData
        next()
    }catch(e){
        console.log(e)

        res.status(403).json({message:'user not authorization'})
    }
}

//module.exports = ()=>1