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
const validateEditProfileData=(req)=>{
    const allowedEditField=[
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ];
    const isEditAllowed=Object.keys(req.body).every((field)=>
        allowedEditField.includes(field)
    );
    return isEditAllowed;
}

module.exports={
    validateSignupData,
    validateEditProfileData
}