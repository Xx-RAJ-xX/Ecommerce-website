const ErrorHandler = require("../utlis/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utlis/jwtToken");
// register a module 

exports.registerUser = catchAsyncErrors( async (req,res,next) =>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profile pic url"
        }
    });

    const token = user.getJWTToken();

    sendToken(user,201,res);
})


// login user
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{

    const {email,password}= req.body;

    //checking if user has given username and password both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,200,res);

})

// logout user
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success: true,
        message: "logged out",
    });
})