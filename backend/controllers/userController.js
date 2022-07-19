const ErrorHandler = require("../utlis/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");

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

    res.status(201).json({
        success:true,
        token,
    });
})


// login user

