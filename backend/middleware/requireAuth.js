const jwt = require('jsonwebtoken')
const user = require('../models/usermodel')

const requireAuth = async (req ,res ,next) =>{
    const {authentication} = req.headers
    if (!authentication) {
        return res.status(401).json({error : "Authentication token required"})

    }
     const token = authentication.split(' ')[1]
     try{
      const {_id} =  jwt.verify(token ,process.env.secret)
     req.user =  await user.findOne({_id}).select('_id')
     next()
     }catch(error){
        res.status(401).json({error: 'request is not authorised'})
     }
} 
module.exports= requireAuth