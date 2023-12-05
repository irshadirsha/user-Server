
const { configDotenv } = require('dotenv')
const userModel = require ('../model/userModel')
const jwt = require ('jsonwebtoken')
require('dotenv').config
const Homes =async(req,res)=>{
    res.send("its working backend server now")
    
}
const Register=async(req,res)=>{
    try {
        console.log("cors connectedd");
        const {name,email,phone,password}=req.body
        console.log(name,email,phone,password);
        const userExist= await userModel.findOne({email:email})
        console.log("existemail",userExist);
        if (userExist) {
            console.log("User already exists with the email:", email);
            return res.json({status:"user is alredy exist"});
        }else{
        console.log("inserted");
        const data= await userModel.create({name,email,phone,password})
        console.log("its env filee-----",process.env.jwtSecretKey);
        const token = jwt.sign({sub: data._id,Role:data.Role},process.env.jwtSecretKey,{expiresIn: '3d'})
        console.log(token);
        console.log(data,"inserted");
        res.json({token,data, created: true})
        }
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const Logins=async(req,res)=>{
    try {
        console.log("cors connected");
        const {email,password}=req.body
        console.log(email,password);
        const userExist=await userModel.findOne({email:email})
        console.log(userExist);
        if(userExist){
            if(userExist.password===password){
            const token = jwt.sign({sub:userExist._id,Role:userExist.Role},process.env.jwtSecretKey,{expiresIn:"3d"})
            console.log(token,"-------------");
            res.json({token,data:userExist,exist:true})
            }else{
                return res.json({status:"passwors is not match"})
            }
        }else{
            res.json({status:"user not found"})
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
        console.log("from middleware -----",userId);
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
module.exports ={Homes,Register,Logins,GetData}