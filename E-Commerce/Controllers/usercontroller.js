
const Usermodel=require('../Models/Users_model')
const ProductsModel=require('../Models/Product_model')
const jsonwebtoken=require('jsonwebtoken')
const cartModel=require('../Models/cartmodel')
const Ordersmodel=require('../Models/ordersmodel')

const Register=(req,res)=>{
    const{Email,password}=req.body
    const newUser=new Usermodel({Email,password})
    newUser.save().then((data)=>{
        return res.json(data)
    })
}
const Login= async(req,res)=>{
    const{Email,password}=req.body;
    Usermodel.findOne({Email}).then((data)=>{
 console.log(data);
       if(data==null){
        return res.json("Email is not registered")
       }
        if(data.password!==password){
        return res.json("Invalid password")
       } 
       const token = jsonwebtoken.sign({ userId: data._id }, process.env.SECRET_KEY, { expiresIn: '1h' })

       return res.json(token)
    })
}
const EditUserName=(req,res)=>{
    const userId=req.userID
    const {username}=req.body
   Usermodel.findOneAndUpdate({_id:userId},{$set:{username:username}}).then((data)=>{
    return res.json(data)
   })
}
const EditProfilePicture=(req,res)=>{
    const userId=req.userID
   
    const path=req.file.path
   
Usermodel.findOneAndUpdate({_id:userId},{$set:{picture:path}}).then((data)=>{
    return res.json(data)
})
}
const ViewProducts=async(req,res)=>{
   const products= await ProductsModel.aggregate([
    {$limit:10}
   ])
   return res.json(products)
}
const ViewProduct=(req,res)=>{
  const {ProductID}=req.params
  
    ProductsModel.findOne({_id:ProductID}).then((data)=>{
        return res.json(data)
    })
}
const AddProducttoCart=async(req,res)=>{
    const{ProductID,Quantity,ProductName}=req.body
 console.log(req.body);
    const userID=req.userID
    const IsUser= await cartModel.find({userId:userID})
  const Iscart= await cartModel.find({'products.ProductId':ProductID})

if(Iscart.length==0  && IsUser.length==0 ){
   const cart=new cartModel({userId:userID,products:[{productId:ProductID,quantity:Quantity,Product_name:ProductName}]})
   cart.save().then((data)=>{
    return res.json(data)
   }) 
}
else{
if(Iscart){
  cartModel.updateOne({'products.ProductId':ProductID},{$inc:{'products.quantity':Quantity}}).then((data)=>{
    return res.json(data)
  })
}
else{

    cartModel.updateOne({userId:userID},{$addToSet:{products:{productId:ProductID,quantity:Quantity}}}).then((data)=>{
        return res.json(data)
    })
    
}
}
  
}
const order_place=(req,res)=>{
    const userID=req.userID
  cartModel.findOne({userId:userID}).then((data)=>{
    if(!data || data.length==0){
      return res.json("no cart items")
    }
   
    const neworder=new Ordersmodel({userID:userID,ProductId:data.products[0]. productId,Product_name:data.products[0].Product_name,Quantity:data.products[0]. quantity})
    neworder.save().then((data)=>{
  
      cartModel.deleteOne({userId:userID}).then((data)=>{
        return res.json(data)
      })
    })
      })
    
}
const viewOrder_status=async(req,res)=>{
  const userID=req.userID
  const {Statusoperation}=req.body
  console.log(req.body);
  const Orderstatus=await Ordersmodel.aggregate([{$match:{userID:userID,Status:Statusoperation}}]);
res.json(Orderstatus)


}
module.exports={
    Register:Register,
    Login:Login,
    EditUserName:EditUserName,
    ViewProducts:ViewProducts,
    ViewProduct:ViewProduct,
    AddProducttoCart:AddProducttoCart,
    EditProfilePicture:EditProfilePicture,
    order_place:order_place,
    viewOrder_status:viewOrder_status
}