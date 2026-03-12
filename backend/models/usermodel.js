const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email :{
        type: String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        requird:true
    }
})
//static signup method
userSchema.statics.signup = async function (email , password)  {
    const exits = await this.findOne({email})
    if(!email || !password){
       throw Error('all fields are mandatory')
    }
    
    if(!validator.isEmail(email)){
     throw Error('email is not valid')
    }

if(!validator.isStrongPassword(password)){
    throw Error("password is not strong");
    
}




    if (exits) {
        throw Error ('email already exits')   
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email , password:hash})
    return user
}
userSchema.statics.login  = async function (email ,password) {
    if(!email || !password){
        throw Error('All FIelds are manadatory')
    }

   const user = await this.findOne({email})
  
   if(!user){
    throw Error ('Incorrect Email!')
   }
    const match = await bcrypt.compare(password, user.password )
    if(!match ){
        throw Error ('Incorrect password')
    }
    return user ;
}
module.exports = mongoose.model('User', userSchema);
