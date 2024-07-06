const mongoose = require('mongoose')
const Schema=mongoose.Schema
const Productschema=new Schema({
    Product_name:{
        required:true,
        type:String
    },
    Price:{
        required:true,
        type:Number
    },
    Description:{
        type:String,
        required:true
    },
    Product_Type:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        
    },
    picture:{
        type:String
    }
   
})
module.exports=mongoose.model("Products",Productschema)