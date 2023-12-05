
const  express =require('express')
const router=express.Router()
const userController = require ('../controller/userController')

// const home=(req,res,next)=>{
//     res.send("its ok")
// }

router.get('/',userController.Homes)
router.post('/register',userController.Register)
router.post('/login',userController.Logins)
router.get('/getdata',userController.GetData)
module.exports =router