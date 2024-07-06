const express=require('express')
const app=express()
const connectDB = require('./configs/db.config')
const dotenv=require('dotenv').config()
const AdminRoutes=require('./Routes/AdminRoutes')
const UserRoutes=require('./Routes/UserRoutes')
connectDB()
app.use(express.urlencoded({extended:true}))
app.listen(process.env.PORT,(err)=>{
    if(err) console.log(err);
    console.log("Server listening on SERVER http://localhost:"+process.env.PORT);
})
app.use("/admin",AdminRoutes)
app.use("/",UserRoutes)
