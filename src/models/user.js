const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
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

userSchema.methods.signJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"DEV@Tinder",{expiresIn:"7d"})
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;//this is refer to the that user
    const passwordHash=user.password;
    const isPasswordHash=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordHash;
}

const User=mongoose.model("User",userSchema);
module.exports=User;