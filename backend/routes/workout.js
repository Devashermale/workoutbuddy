const express = require('express')
const {createworkout,getworkouts,getworkout,patchworkouts,deleteworkout } = require('../controller/controller')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//require auth
router.use(requireAuth)
//get 
router.get('/',getworkouts)
//get by id
router.get('/:id',getworkout)
//post
router.post('/',createworkout)
//delete
router.delete('/:id',deleteworkout)
//patch
router.patch('/:id',patchworkouts)

module.exports = router