const mongoose=require('mongoose');
const connectionRequest=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
        values:["ignored","intrested","accepted","rejected"],
        message: '{VALUE} is not a valid status'
          }
    }
},{
    timestamps:true,
})

connectionRequest.pre("save",function(next){
    const connectionRequest=this;
    //check if the fromUserId is same as toUserId 
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
           throw new Error("Cannot send connection request to yourself");
    }
    next();
})

//connectionRequest.find({fromUserId:870-894210,toUserId:94804872509999986--})
//compound indexing
connectionRequest.index({fromUserId:1});
connectionRequest.index({fromUserId:1,toUserId:1});
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequest);
module.exports=ConnectionRequestModel; 

