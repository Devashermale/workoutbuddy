const user = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const createtoken = (_id) =>{
    return jwt.sign({_id},process.env.Secret,{expiresIn:'3d'})
}
//login user

exports.loginuser =  async (req ,res) => {


 const {email ,password} = req.body
     try {
        const users  = await user.login(email ,password)
        const token = createtoken(users._id)
        res.status(200).json({email ,token})
     } catch (error) {
     res.status(400).json({error: error.message})
     }
    
}






//signup user
exports.signupuser =  async (req ,res) => {
     const {email ,password} = req.body
     try {
        const users  = await user.signup(email ,password)
        const token = createtoken(users._id)
        res.status(200).json({email ,token})
     } catch (error) {
     res.status(400).json({error: error.message})
     }

}


