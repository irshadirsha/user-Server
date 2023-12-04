const express = require ('express')
const app=express()

const userRouter = require('./router/userRouter')
app.use('/',userRouter)

app.listen(3000,()=>{
    console.log("serever started")
})