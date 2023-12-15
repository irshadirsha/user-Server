
const  express =require('express')
const router=express.Router()
const userController = require ('../controller/userController')
const verifyToken= require ('../middleware/auth')
// const home=(req,res,next)=>{
//     res.send("its ok")
// }

router.get('/',userController.Homes)
router.post('/register',userController.Register)
router.post('/login',userController.Logins)
router.get('/getdata',verifyToken,userController.GetData)
router.post('/addimg',verifyToken,userController.AddImg)
router.post('/addchat',verifyToken,userController.AddChat)
router.get('/getchat',verifyToken,userController.GetChat)
router.get('/connectChat',verifyToken,userController.ConnectChat)
// router.get('/getchatmsg',verifyToken,userController.GetChatMsg)
module.exports =router