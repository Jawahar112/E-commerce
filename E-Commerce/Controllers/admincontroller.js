const Product_model = require("../Models/Product_model");
const Admin_model = require("../Models/Admin_model");
const ordersmodel = require("../Models/ordersmodel");

const Login = (req, res) => {
  const { Email, password } = req.body;

  Admin_model.findOne({ Email }).then((data) => {
    if (data.password !== password) {
      return res.json("Invalid Password");
    }
  });
};
const addproduct = (req, res) => {
  const { Product_name, Price, Description} = req.body;
  
  const newProduct = new Product_model({
    Product_name,
    Price,
    Description,
    
  });
  const addedproduct = newProduct.save();
  addedproduct.then((data) => {
    console.log(data);
  });
};
const viewOrder = (req, res) => {
  const { userID } = req.params;
  ordersmodel.find({ userID }).then((data) => {
    return res.json(data);
  });
};
const EditProductImage = (req, res) => {
  const { Productid } = req.params;
  console.log(req.file.path);
  Product_model.updateOne({ _id: Productid }, { picture: req.file.path }).then(
    (data) => {
      return res.json(data);
    }
  );
};
const OrderStatus=(req,res)=>{
  const{OrderId,status}=req.body
  ordersmodel.updateOne({_id:OrderId},{Status:status}).then((data)=>{
    return res.json("operation completed")
  })

}
module.exports = {
  Login: Login,
  addproduct: addproduct,
  EditProductImage: EditProductImage,
  viewOrder: viewOrder,
  OrderStatus:OrderStatus
};
