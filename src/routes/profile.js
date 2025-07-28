const express=require('express');
const profileRouter=express.Router();
const User=require('../models/user')
const {userAuth}=require('../middlewares/auth')
const {validateEditProfileData}=require('../utils/validation');
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
      const userData=req.user;
      if(!userData){
        throw new Error("invalid user");
      }
        res.send(userData);
    
     res.send("Reading Cookies")
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  console.log(validateEditProfileData(req))
  try{
    if(!validateEditProfileData(req)){
      throw new Error("invalid edit request");
    }
    const loggedUser=req.user;
    Object.keys(req.body).forEach((key)=>(loggedUser[key]=req.body[key]));
    await loggedUser.save();
    res.send( `${loggedUser.firstName},your Profile updated Successfully`);
  }
  catch(error){
        res.status(400).json({ error: error.message });
    }
  
})

module.exports=profileRouter;