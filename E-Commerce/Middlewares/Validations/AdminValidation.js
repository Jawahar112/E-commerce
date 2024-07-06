const AdminValidationSchema=require("../../utils/AdminValidationSchema")
const ValidateLogin=(req,res,next)=>{
const{error}=AdminValidationSchema.LoginSchema.validate(req.body)
if(error){
    return res.json(error)
}
next()
}
module.exports={
    ValidateLogin:ValidateLogin
}