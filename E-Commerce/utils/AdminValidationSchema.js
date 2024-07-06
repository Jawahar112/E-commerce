const joi=require('joi')
const LoginSchema=joi.object({
    Email:joi.string().email().required(),
    password:joi.string().min(6).required()
})
module.exports={
    LoginSchema:LoginSchema
}