const mongoose=require('mongoose');

const database=async()=>{
    await mongoose.connect('mongodb://localhost:27017/devTinder' 
)}

module.exports=database;