const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;
 
app.use(express.json());

//connect to DB
require("./config/database").connect();

//import and mount the routes
const user = require('./routes/user')

app.use("/api/v1", user);


app.listen(PORT ,()=>{
    console.log(`App listening at ${PORT}`)
})

