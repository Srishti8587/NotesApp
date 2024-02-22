const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

exports.getAllUsers= async (req,res)=>{
    try{
        const user = await userModel.find({});
        return res.status(200).send({
            userCount:(await user).length,
            success:true,
            message:"Successfully got all Users",
            user
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in getting all Users",
            error
        })
    }
};

exports.createController= async (req,res) => {
    try{
        const {username,email,password}=req.body
        //existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser)
        {
            console.log("already existing");
            return res.status(202).send({
                success:false,
                message:"User already exists"
            })
        }

        //encryption of password
        const hashPassword = await bcrypt.hash(password,10);
        //save user
        const user=new userModel({username,email,password :hashPassword});
        await user.save();
        console.log("New user created");
        return res.status(200).send({
            success:true,
            message:"New User Created",
            user
        })
    }
    catch (error){
        console.log(error)
        return res.send(500).send({
            success:false,
            message:"Error in registering Callback",
            error
        })

    }
};

//login
exports.loginController= async (req,res)=>{
try{
    const {email,password} = req.body;
    // if user doesn't exists
    const user = await userModel.findOne({email});
    if(!user)
    {
        return res.status(202).send({
            success:false,
            message:"User doesn't exists"
        })
    }
    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return res.status(202).send({
            success:false,
            message:"Invalid Username or Password"
        });
    }

    let options={
        expiresIn:process.env.expiresIn
    }
    const Token = jwt.sign({userId:user._id},process.env.SECRET_KEY,options);
    console.log(user._id);
    return res.status(200).send({
        success:true,
        message :"Login Succesfully!!",
        token:Token,
        user
    })

}
catch(error)
{
    console.log(error);
    return res.status(501).send({
            success:false,
            message:"Error in Login Callback",
            error
    })
}
};