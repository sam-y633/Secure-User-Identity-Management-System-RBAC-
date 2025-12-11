const userModel = require("../model/userSchema");
const emailValidator = require('email-validator');
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);
    
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        });
    }

    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email id"
        });
    }
   
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and confirm password don't match"
        });
    }

    try {
        const userInfo = new userModel(req.body);
        const result = await userInfo.save();
        
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (e) {
        if (e.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Account already exists with provided id'
            });
        }
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }   
}

const signin = async (req, res) => {
    const { email, password } = req.body;
   
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Every field is mandatory"
        });
    }

    try {
        const user = await userModel
            .findOne({ email })
            .select('+password');

          // If user is null or the password is incorrect return response with error message
    if (!user || !(await bcrypt.compare(password, user.password))) {
        // bcrypt.compare returns boolean value
        return res.status(400).json({
          success: true,
          message: "invalid credentials"
        });
      }

        const token = user.jwtToken();
        user.password = undefined;
        
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000, // Corrected maxAge to 24 hours in milliseconds
            httpOnly: true
        };
        
        res.cookie("token", token, cookieOption);
        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}

const getUser = async (req, res, next) => {
    const userId = req.user.id; // Corrected variable name

    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
};

const logout = (req,res) => {
    try{
       const cookieOption = {
        expires: new Date(),
        httpOnly: true
       };
       res.cookie("token",null,cookieOption);
       res.status(200).json({
           success:true,
           message:"Logged Out"
       })
    } catch(e){
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}
module.exports = {

    signup,
    signin,
    getUser,
    logout
}

// Controller: authController.js

// The signup function is defined to handle the logic for user signup.
// It extracts name, email, password, and confirmPassword from the request body.
// It logs these values to the console and responds with a success status and an empty data object.
// The signup function is exported.
