
const { configDotenv } = require('dotenv')
const userModel = require ('../model/userModel')
const jwt = require ('jsonwebtoken')
require('dotenv').config
const Homes =async(req,res)=>{
    res.send("its working backend server now")
    
}
const Register=async(req,res)=>{
    try {
        const {name,email,phone,password}=req.body
        console.log(name,email,phone,password);
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
        console.log(email,password);
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
        console.log(email);
        // const data= await userModel.findOne({email:email})
        const data= await userModel.findOne({_id:userId})
        if(data){
            console.log(data);
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
module.exports ={Homes,Register,Logins,GetData,AddImg}