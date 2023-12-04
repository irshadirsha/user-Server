const express = require ('express')
const app=express()
const cors = require ('cors')
const dotenv = require("dotenv")
dotenv.config();

const db= require ('./config/connection')
db()
const userRouter = require('./router/userRouter')
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods: ["GET", "POST",'DELETE','PUT'],
    credentials: true
  }));
app.use('/',userRouter)

  
app.listen(3000,()=>{
    console.log("serever started")
})