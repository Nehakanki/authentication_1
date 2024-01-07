const  bcyrpt = require("bcrypt");
//since controller depends on controller
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.signup = async(req, res)=>{
    try{
        const {name, email, password, role} = req.body;

        //check if the user aldready exist

        const existinquire = await User.findOne({email});
        if(existinquire){
         return res.status(400).json({
            sucess:false,
            message:"User aldready exist"
         });
        }
        //secure the password
        let hashedPassword;
        try{
            hashedPassword = await bcyrpt.hash(password , 10);
        }
        catch(err){
            return res.status(500).json({
                sucess : false,
                message:"error in hashing Password",
            })
        }

        //create the entry for user after hashing the password
        const user = await User.create({
            name, email,password :hashedPassword, role 
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",

        })


    }
    catch(err){
        return res.status(500).json({
            sucess : false,
            message:"user cannot be registered",
        })

    }
}


exports.login = async(req, res)=>{
    try{
        //fetch the data
        const {email, password } = req.body;
        //validation of email and password 
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully"
            })
        }
        //check the registered User
      let  user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"

            })
        }
        //creating the Payload
        const payload ={
            email: user.email,
            id: user._id,
            role: user.role,

        };

        const options ={

            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        //verify the password
        if(await bcyrpt.compare(password, user.password)){
            //create the JWT token
            let token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"7d",
            });
            
            user.token = token;
            await user.save(); //in order to enter into the Schema
            //remove password 
            user.password = undefined;
            //create Cookies : nameOfCookie, Cookie and options
            res.cookie("name_of_cookie", token, options ).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged in successfully",

            })
            


            
        }

        else{
            return res.status(403).json({
                success:false,
                message:"password incorrect"

            })

        }


    }
    catch(err){
        console.log(err+"Error occured")
        return res.status(500).json({
            success: false,
            message :"Login Failure"
        })
    }

}
