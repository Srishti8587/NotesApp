const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const validateUserAuth = (req, res, next) =>{
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: 'Email or password missing in the request'
        });
    }
    next();
  }
  
  const validateCreateAuth = (req, res, next) =>{
    if(!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: 'Provide all details'
        });
    }
    next();
  }

module.exports = {validateUserAuth,validateCreateAuth};
