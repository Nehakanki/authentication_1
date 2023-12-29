const mongoose = require("mongoose")

require("dotenv").config();


exports.connect =()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser : true,
        // useUnifiedParser : true
    }).then(()=>{console.log("Connect Db")})
    .catch((err)=>{console.log("error occured"+err)
        process.exit(1);
})

}