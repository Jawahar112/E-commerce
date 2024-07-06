const mongoose = require('mongoose')
const Schema=mongoose.Schema
const Adminschema=new Schema({
    Email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
   
})
module.exports=mongoose.model('Admin',Adminschema)