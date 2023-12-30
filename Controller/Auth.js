const  bcyrpt = require("bcrypt");
const User = require("../Model/User");

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

        //create the entry for user
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

    }
    catch(err){
        
    }

}
