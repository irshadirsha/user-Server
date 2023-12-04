

const Homes =async(req,res)=>{
    res.send("its working backend server now")
    
}
const Register=async(req,res)=>{
    console.log("cors connected");
    const {name,email,password,phone}=req.body
    console.log(name,email,password,phone);
    
    res.json({status:"successfull signup"})
}
const Logins=async(req,res)=>{
    console.log("cors connected");
    const {email,password}=req.body
    console.log(email,password);
    res.json({status:"successfull login"})
}
module.exports ={Homes,Register,Logins}