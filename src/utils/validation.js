const validator=require('validator');

const validateSignupData=(req)=>{
    const {firstName,lastName,password,emailId}=req.body;
    //fristname and lastname check
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong passward");
    }
}

module.exports={
    validateSignupData,
}