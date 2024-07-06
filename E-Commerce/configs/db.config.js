const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL,{
       
  
       
      });
      console.log('MongoDB Connected');
    } catch (err) {
      console.error(err.message);
     
    }
  };
  
  module.exports = connectDB;