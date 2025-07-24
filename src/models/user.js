const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,//convert upper to lower
        trim:true//remove spaces
    },
    password:{
        type:String,
        required:true,
        maxLenght:50,
        minLength:5
    },
    age:{
        type:Number,
        min:18,
        max:50
    },
    gender:{
        type:String,
        //custom validation function
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid")//only valid for creating new document
                //not apply validators for existing function
            }
        }
    },
    village:{
        type:String,
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
        default:"this deafult page",
    },
    skills:{
        type:[String]
    },
   
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema);
module.exports=User;