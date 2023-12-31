const express = require('express');
const router = express.Router();


const {login, signup } = require("../Controller/Auth");

const {auth, isStudent , isAdmin} = require("../middlewares/auth");



 router.post("/login", login);
router.post("/signup", signup);

//dummy middle ware for testing

router.get("/test", auth ,(req,res)=>{
    res.json({
        success:true,
        message:"Auth testing"
    })
})
//Protected Routes
router.get("/student", auth, isStudent, (req, res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for Student"
    });

});

router.get("/admin", auth, isAdmin, (req, res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for Admin"
    });

});



module.exports = router;
