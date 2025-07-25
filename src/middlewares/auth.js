const jwt=require('jsonwebtoken');
const User=require('../models/user')
const userAuth=async(req,res,next)=>{
    try{
      //read token from the request 
         const cookies=req.cookies;
         const {token}=cookies;
          if(!token){
        throw new Error("Invalid Token!!!!!");
     }
         const decodedObj=await jwt.verify(token,"DEV@Tinder")
      //validate token
         const {_id}=decodedObj;
         //find the user
         const user=await User.findById(_id);
         if(!user){
            throw new Error("user not found")
         }
         req.user=user;
          next();
      
    }
     catch(error){
        res.status(400).json({ error: error.message });
    }
}
module.exports={
    userAuth,
}