const jwt =require ('jsonwebtoken')

require('dotenv').config();

const verifyToken=async(req,res,next)=>{
    console.log("middleware called---------------------------------------------------------");
    console.log(req.headers.authorization);
    const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const [, token] = authorizationHeader.split(' ');
  
  if (!token) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  console.log(token);
  console.log(process.env.jwtSecretKey)
  try {
    const data=jwt.verify(token,process.env.jwtSecretKey)
    console.log(data);
    req.userId=data.sub
    const actionRole=data.Role
    if(actionRole==="User"){
        console.log("auth successfull");
        next()
    }
  } catch (error) {
    return res.status(403).json({ message: 'Token expired or invalid' });
  }
}


module.exports = verifyToken


  