const express=require('express');
const {validateSignupData}=require('../utils/validation')
const authRouter=express.Router();
const User=require('../models/user')
const bcrypt=require('bcrypt')
authRouter.post('/signup',async(req,res)=>{ 
    try{
     //validate data
      validateSignupData(req);
      const {firstName,lastName,emailId,password}=req.body;
       //hashed passward
      const hashPassword=await bcrypt.hash(password,10);
      console.log(hashPassword);

   

     const user=new User({ //req.body
      
      firstName,lastName,emailId,password:hashPassword
    });//creating a new instance of the user Model 
    
        const userData=await user.save();
          res.status(200).json({
        data:userData,
        Message:"user Created Sucessfully"
    })
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})

authRouter.post('/login',async(req,res)=>{

    try{
        const {emailId,password}=req.body;
        //validate email
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){

               const token=await user.signJWT();
                //add the token to cookie and send the response back to the user 
                res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)},{httpOnly:true})
            res.status(200).json({
                message:"login successful!!",
            })
        }
        else{
            throw new Error("Invalid Credentials");
        }

    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
    
})


module.exports=authRouter;