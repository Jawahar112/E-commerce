const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const verify = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.SECRET_KEY, (err, decodeddata) => {
    if (err) {
      return res.json(err);
    }

     req.userID=decodeddata.userId
    next();
  });
};
module.exports = {
  verify: verify,
};
