
const mongoose = require('mongoose')
const Schema=mongoose.Schema
const Ordersschema=new Schema({
    userID:{
        required:true,
        type:String
    },
   ProductId:{
    required:true,
    type:String
   },
   Product_name:{
    required:true,
    type:String
   },
   Quantity:{
    required:true,
    type:Number
   },
   Status:{
    type:String,
    default:"pending"
    
   }
 
})
module.exports=mongoose.model("Orders",Ordersschema)