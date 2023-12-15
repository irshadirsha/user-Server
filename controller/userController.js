
const { configDotenv } = require('dotenv')
const userModel = require ('../model/userModel')
const chatModel= require ('../model/chatModel')
const jwt = require ('jsonwebtoken')
require('dotenv').config
const Homes =async(req,res)=>{
    res.send("its working backend server now")
    
}
const Register=async(req,res)=>{
    try {
        const {name,email,phone,password}=req.body
        // console.log(name,email,phone,password);
        const userExist= await userModel.findOne({email:email})
        if (userExist) {
            return res.json({created:false,status:"user is alredy exist"});
        }else{
        const data= await userModel.create({name,email,phone,password})
        const token = jwt.sign({sub: data._id,Role:data.Role},process.env.jwtSecretKey,{expiresIn: '3d'})
        res.json({token,data, created: true})
        }
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const Logins=async(req,res)=>{
    try {
        const {email,password}=req.body
        // console.log(email,password);
        const userExist=await userModel.findOne({email:email})
        if(userExist){
            if(userExist.password===password){
            const token = jwt.sign({sub:userExist._id,Role:userExist.Role},process.env.jwtSecretKey,{expiresIn:"3d"})
            res.json({token,data:userExist,exist:true})
            }else{
                return res.json({exist:false,status:"Passwors is Not Match"})
            }
        }else{
            res.json({exist:false,status:"Email is Not Found"})
            console.log("user not found");
        }
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const GetData=async(req,res)=>{
    try {
        const {email}=req.query
        const userId=req.userId
        // console.log(email);
        // const data= await userModel.findOne({email:email})
        const data= await userModel.findOne({_id:userId})
        if(data){
            // console.log(data);
            res.json({data})
        }else{
            return res.json({status:"data is not found"})
        }
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}
const AddImg=async (req,res)=>{
    try {
        const {url}=req.body
        const userId=req.userId
        await userModel.updateOne({_id:userId},{$set:{image:url}})
        res.json({status:"image updated successfully"})
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const AddChat=async(req,res)=>{
    try {
        const {message,reciverId}=req.body
        const userId=req.userId
        console.log("message",message);
        console.log("addchat id",userId);
        console.log("reciver  id",reciverId);
        console.log("message reached");
        const data = await chatModel.create({ message:message,receiver:reciverId,sender:userId})
        console.log(data);
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}
const GetChat=async(req,res)=>{
     console.log("api reached");
     const userId=req.userId
     try {
        const data= await userModel.find({ _id: { $ne: userId } })
        res.json(data)
     } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Internal server error" });
     }

}

const ConnectChat=async(req,res)=>{
    console.log("api reached for name");
    const {UserID}=req.query
    const userId=req.userId
    console.log(UserID);
    const data=await userModel.findOne({_id:UserID})
    // const res=await chatModel.find({$and[{reciver:UserID},{sender:userId}]})
    const result = await chatModel.find({
        $and: [
          { receiver: UserID },
          { sender: userId }
        ]
      });
      console.log("+++++++++",result);
    console.log("------------------",data);
    res.json(data)
}

// const GetChatMsg=async(req,res)=>{
//     console.log("reached to retrive msg");
//     const {reciverId}=req.query
//     const userId=req.userId
//     console.log(reciverId);
//     console.log(userId);
// }


module.exports ={Homes,Register,Logins,GetData,AddImg,AddChat,GetChat,ConnectChat}