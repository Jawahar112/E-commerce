const multer = require("multer");

const Profilestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const Productstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "product_images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const profilestorage = multer({ storage: Profilestorage });
const productStorage = multer({ storage: Productstorage });

const upload_profile=(req,res,next)=>{
    const upload_image = profilestorage.single("file");
    upload_image(req, res, (err) => {
      
      if (err) {
        return res.json({ Error: err, Message: "NO folder Detected" });
      } else if (err instanceof multer.MulterError) {
        return res.json("err");
      }
      next();
    });
}
const  product_picture=(req,res,next)=>{
    const upload_image = productStorage.single("file");
    upload_image(req, res, (err) => {
      
      if (err) {
        return res.json({ Error: err, Message: "NO folder Detected" });
      } else if (err instanceof multer.MulterError) {
        return res.json("err");
      }
      next();
    });
}
module.exports={
    upload_profile:upload_profile,
    product_picture:product_picture
}