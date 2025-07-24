const express=require("express");
const app=express();
const PORT=3000;
app.use(express.json());
//this will match all the http method API calls to /test
// app.use("/test",(req,res)=>{ 
//      res.send("hello sever run");
// })
// //this will only handle GET call to getdata 
// app.get('/getdata',(req,res)=>{
//     res.send("get user data");
// })

// app.get('/json',(req,res)=>{
//     console.log(req.query)
//     res.json({
//         "name":"Ganesh",
//         "age":23
//     })
// })

// app.post('/postdata',(req,res)=>{
//     console.log("data save");
//     res.send({
//         "name":"Ganesh Gajanan Kanade"
//     })
// })
// app.put('/updatedata',(req,res)=>{
//     res.send("update data");
// })
// app.delete('/deletedata',(req,res)=>{
//     res.send("Data are Deleted");
// })

// app.use('/user',(req,res,next)=>{
//       next();//second response send
//     res.send("hello Ganesh Good morning");//it gives error
//     // next();//first res send
// },(req,res,next)=>{
//     next();
//     res.send("second response");
//     // next();
// },(req,res,next)=>{
//     res.send("Third request");
//     next();
// },(req,res)=>{
//     res.send("fourth request");
// })
const connectDB=require('./config/database');
const User=require('./models/user')
const bcrypt=require('bcrypt')
const {validateSignupData}=require('./utils/validation');
//create user
app.post('/signup',async(req,res)=>{
        //console.log(req.body)
    try{
     //validate data
      validateSignupData(req);
      const {firstName,lastName,emailId,password}=req.body;
       //hashed passward
      const hashPassword=await bcrypt.hash(password,10);
      console.log(hashPassword);

     //then store user data

     const user=new User({ //req.body
        //{
    //     firstName:"Omkar",
    //     lastName:"Kanade",
    //     emailId:"omkaranade7666@gmail.com",
    //     age:23,
    //     gender:"Male"
    // }
      firstName,lastName,emailId,password:hashPassword
    });//creating a new instance of the user Model 
    
        const userData=await user.save();
          res.status(200).json({
        data:userData,
        Message:"user Created Sucessfully"
    })
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})
//get all userdata from database
app.get('/getuser',async(req,res)=>{
    const data=await User.find({});
    try{
        res.status(201).json({
            data:data,
            message:"users data"
        });
    }
    catch(error){
        console.log(error)
    }
})


//get user from database using email
app.get('/getoneuser',async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
          const data=await User.findOne({emailId:userEmail});
          if(data.length===0){
            res.status(404).send("user not found");
          }
          else{
            res.send(data);
          }
    }
    catch(error){
        console.error(error);
        res.status(400).send("something went wrong")
    }
})

//get user from database by id
app.get('/getbyid',async(req,res)=>{
    console.log(req.body);
    const userId=req.body._id;
    try{
          const data=await User.find({_id:userId});
          if(data.length===0){
            res.status(404).send("user not found");
          }
          else{
            res.send(data);
          }
    }
    catch(error){
        console.error(error);
        res.status(400).send("something went wrong")
    }
})


//HW-get user find by findById method

app.get('/getuser/:id',async(req,res)=>{
    const id=req.params.id;
    try{
         const user=await User.findById(id);
         if(!id){
            res.status(400).send("user not found");
         }
         else{
            res.status(200).send(user)
         }
    }
    catch(error){
          res.status(404).send("something went wrong",error);
    }
})

//user delete api 
app.delete('/delete',async(req,res)=>{
    const id=req.body.userid;
    try{
         // const data=await User.findByIdAndDelete({_id:id})
         const data=await User.findByIdAndDelete(id)
         res.send("user deleted sucessfully");
    }catch(error){
          res.status(404).send("something went wrong",error);
    }
    
})


//api for update data of user
app.patch('/updateuser/:id',async(req,res)=>{
    const id=req.params?.id;//req.body.id;
    const data=req.body;
    
    try{
        //valiadate function to do not update email
    const ALLOWED_UPDATES=["photourl","about","gender","age","skills"];
    const isAllowedUpdates=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    if(!isAllowedUpdates){
        throw new Error("Data is not updated check field")
    }
    //skils is not more then 10
    if(data?.skills.length > 10){
        throw new Error("skills cannot be more than 10");
    }
        const updatedUser=await User.findByIdAndUpdate({_id:id},data,{
            returnDocument:"before",
            runValidators:true
        })
        //returnDocument:"before-->it give document befour update and store update document in mongo database
        res.send(updatedUser)
        //console.log(updatedUser);
    }
    catch(error){
          res.status(400).json({ error: error.message });
    }

})

//login API 
app.post('/login',async(req,res)=>{

    try{
        const {emailId,password}=req.body;
        //validate email
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.status(200).json({
                message:"login successful!!",
            })
        }
        else{
            throw new Error("Invalid Credentials");
        }

    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
    
})


connectDB().then(()=>{
    console.log("database connected Successfully");
    app.listen(PORT,(req,res)=>{
        console.log("server start on port number 3000")
    })
}).catch((error)=>{
    console.log("error"+error)
})






 