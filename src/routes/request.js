const express=require('express');
const requestRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const authRouter = require('./auth');
const ConnectionRequestModel=require('../models/connectionRequest');
const User=require('../models/user')

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
   try{
         const fromUserId=req.user._id;//vimp
         const toUserId=req.params.toUserId;//vimp
         const status=req.params.status;//vimp

         //handle user1 to user1 connection request
        //  if(fromUserId.toString()===toUserId.toString()){
        //     return res.send("invalid connection request");
        //  }

       // i want only handle status is ignored or intrested
         
       const allowStatus=["ignored","intrested"];
       if(!allowStatus.includes(status)){
              return res.status(400).json({
                message:"Invalid status type "+ status,
              })
       }

       //find existing user or not
       const toUser=await User.findById(toUserId);
       if(!toUser){
           return res.send("User does Not Exist");
       }

       //find existing connection request
       const existingConnectionRequest=await ConnectionRequestModel.findOne({
        $or:[
            {fromUserId,toUserId},//userid check exist or not
            {fromUserId:toUserId,toUserId:fromUserId}//check user1 to user2 and user2 to user1 not send request
        ]
       })
       if(existingConnectionRequest){
           return res.send("connection is already");
       }
         const connectionRequest=new ConnectionRequestModel({
              fromUserId,
              toUserId,
              status,
         })

         const data=await connectionRequest.save();

         res.json({
            mesage:req.user.firstName +" is "+status+" in "+toUser.firstName,
            data:data
         })

   }
   catch(error){
        res.status(400).json({ error: error.message });
    }
    
})

//get connction request data
requestRouter.get('/getconnctionData',userAuth,async(req,res)=>{
    try{
        const connectionData = await ConnectionRequestModel.find({});
          console.log(connectionData)
          res.send(connectionData);
    }
     catch(error){
        res.status(400).json({ error: error.message });
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("Logout Successfull");
})

module.exports=requestRouter;