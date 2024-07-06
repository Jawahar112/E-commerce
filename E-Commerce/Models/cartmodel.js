
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: String,

        required: true
    },
    products: [{
        Product_name:{
     type:String,
      required:true
        },
        productId: {
           type:String,
           required:true
          
        },
        quantity: {
            type: Number,
            required:true
            
        }
    }]
 
});

module.exports=mongoose.model('cart',cartSchema)
