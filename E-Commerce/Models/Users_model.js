
const mongoose = require('mongoose')
const Usersschema=mongoose.Schema({
    Email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    username:{
        required:true,
        type:String
    }
    ,picture:{
        required:true,
        type:String
    }
   
})
module.exports=mongoose.model("Users",Usersschema)