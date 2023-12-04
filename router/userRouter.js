
const  express =require('express')
const router=express.Router()
const userController = require ('../controller/userController')

// const home=(req,res,next)=>{
//     res.send("its ok")
// }

router.get('/',userController.Homes)

module.exports =router