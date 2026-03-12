const express = require('express')
const {loginuser,signupuser} = require('../controller/usercontroller')  
const router = express.Router()



//login route
router.post('/login',loginuser)


//signup route
router.post('/signup',signupuser)





module.exports = router