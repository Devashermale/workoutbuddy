// importing express package
const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout.js')
const userlogin = require('./routes/user.js')
dotenv.config()
//express app
app.use(cors ({
    origin:'http://localhost:3001'
}))

app.use((req, res, next)=>{
    console.log(req.path , req.method)
    next()
})
app.use(express.json())

app.use('/api/workouts/',workoutRoutes)
app.use('/api/user',userlogin)

//connection of db 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected');
app.listen(port,()=>{
    console.log(`server is up http://localhost:${port}`);
    
})
    
})
//port num
const port = process.env.port||3000;
//Routes
app.get('/',(req ,res)=>{
    res.json({msg:'welcome to our appln'})
})







