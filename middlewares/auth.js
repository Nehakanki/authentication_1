//3 middlewares


//auth , isStudent , isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

//
exports.auth = (req,res,next)=>{
    try{
        //1. extract JWT token from Body

        const token = req.body.token || req.cookie.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            res.status(401).json({
                success:false,
                message: "Token Missing"
            });


        }

        //2. Verify the Token

        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user= payload;
            // console.log(req.user);///last error here 
        

        }catch(err){
            return res.status(401).json({
                success:false,
                message:"token invalid"

            })
        }
        //go to next middleware

        next();
    }

    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went Wrong, while verifying the token"
        })


    }
   

}

//checking the authorization

exports.isStudent = (req, res, next)=>{
    try{
        if(req.user.role !=='Student'){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for student"
            });
        }
        next();
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        })

    }
}


exports.isAdmin = (req,res, next)=>{
    try{
        if(req.user.role !=='Admin'){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Admin"
            });
        }
        next();
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        })

    }
    
}