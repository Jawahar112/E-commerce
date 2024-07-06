
const UserController=require('../Controllers/usercontroller')
const multer_middleware=require('../Middlewares/multermiddleware')
const JWTMiddleware=require('../Middlewares/Validations/Jwtmiddleware')
const Router=require('express').Router()
Router.route('/register').post(UserController.Register)
Router.route('/Login').get(UserController.Login)
Router.route('/Edit/Username').put(JWTMiddleware.verify,UserController.EditUserName)
Router.route('/view/products').get(JWTMiddleware.verify,UserController.ViewProducts)
Router.route('/view/product/:ProductID').get(JWTMiddleware.verify,UserController.ViewProduct)
Router.route('/cart/addProduct').post(JWTMiddleware.verify,UserController.AddProducttoCart)
Router.route('/Edit/profile').put(JWTMiddleware.verify,multer_middleware.upload_profile,UserController.EditProfilePicture)
Router.route('/order/place').post(JWTMiddleware.verify,UserController.order_place)
Router.route('/view/orderStatus').get(JWTMiddleware.verify,UserController.viewOrder_status)
module.exports=Router
