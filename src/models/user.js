const mongoose=require('mongoose');
const validator=require('validator');
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
        trim:true,//remove spaces
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address")
            }
        }
    },
    password:{
        type:String,
        required:true,
        maxLenght:50,
        minLength:5,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("passward must Strong")
            }
        }
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
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("give correct url")
            }
        }
        
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