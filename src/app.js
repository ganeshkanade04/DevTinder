const express=require("express");
const app=express();
const PORT=3000;
app.use(express.json());
const cookieParser=require('cookie-parser');
app.use(cookieParser());
const connectDB=require('./config/database');

const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


connectDB().then(()=>{
    console.log("database connected Successfully");
    app.listen(PORT,(req,res)=>{
        console.log("server start on port number 3000")
    })
}).catch((error)=>{
    console.log("error"+error)
})






 