const express=require("express");
const { getAllUsers, createController, loginController } = require("../controllers/UserController");
const { validateUserAuth ,validateCreateAuth} = require("../middlewares/userAuth");

//router pbject
const router=express.Router();


//Get all users
router.get('/all-users',getAllUsers)

// create users
router.post('/create-account',validateCreateAuth,createController);

// login
router.post("/login",validateUserAuth,loginController);

module.exports=router;