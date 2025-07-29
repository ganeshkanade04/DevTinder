const express=require('express');
const userRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const ConnectionRequestModel=require('../models/connectionRequest');
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
           const loggedInUser=req.user;
           const connectionRequest=await ConnectionRequestModel.find({
              toUserId:loggedInUser._id,
              status:["intrested","accepted"]
           }).populate("fromUserId",["firstName","lastName"])//fristname.lastname nahi pass kel tar purn data deto
 //.populate("fromUserId","firstName,lastName,age,gender,about")
           res.status(200).json({
            message:"user Data are :",
            data:connectionRequest
           })
    }
    catch(error){
        res.send("ERROR :"+error.message);
    }
})

userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try{
           const loggedInUser=req.user;
           //akshy=>Elon=>accepted
           //Elon=>mark=>accepted
           const connectionRequests=await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
           }).populate("fromUserId",["firstName","lastName","gender","age"])
           .populate("toUserId",["firstName","lastName","gender","age"])
           const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                 return row.toUserId;
            }
            return row.fromUserId
    });
           res.json({
            message:"connections are :",
            data:data
           })
    }
    catch(error){
         res.send("ERROR :"+error.message);
    }
})


module.exports=userRouter;