const express = require ('express')
const app=express()
const cors = require ('cors')
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT;
const db= require ('./config/connection')
db()
const userRouter = require('./router/userRouter')
app.use(express.json());
app.use(cors({
    origin:process.env.Client_Side_URL,
    methods: ["GET", "POST",'DELETE','PUT'],
    credentials: true
  }));
app.use('/',userRouter)

  
app.listen(port,()=>{
    console.log("serever started")
})