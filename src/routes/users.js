const express=require('express');
const userRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const User=require("../models/user")
const ConnectionRequestModel=require('../models/connectionRequest');
const USER_SAFE_DATA="firstName lastName age gender skills"
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

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        //User see all the user cards except
        //0. his own card
        //1. hi connection 
        //2. ignored people
        //3.already sent the connection request

        //rahul is login rehul send request =[ganesh,omkar,samruddhi,mayur,ram];
        //rahul send request to ganesh
        //rahul=[omkar,samruddhi,mayur,ram]
        //rahul rejected//accepted ram profile and do not show again to ram profile to rahul
         
        const loggedInUser=req.user;
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
         limit=limit>50?50:limit;
        const skip=(page-1)*limit;
        //find all connection requect both send and received
        const connectionRequest=await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id},
            ]
         }).select({ fromUserId: 1, toUserId: 1 })
         //.populate("fromUserId","firstName")
        // .populate("toUserId","firstName");;
    //single object sathi("fromUserId","toUserId")

    const hideUserFromFeed=new Set();
    connectionRequest.forEach((req) => {
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
    });
    

    const remainingUser=await User.find({
       $and:[{_id:{ $nin:Array.from(hideUserFromFeed)},},
        {_id:{$ne:loggedInUser._id}}     
    ]}).select(USER_SAFE_DATA).skip(skip).limit(limit);


        res.json({remainingUser});
    }
     catch(error){
         res.send("ERROR :"+error.message);
    }
})


module.exports=userRouter;