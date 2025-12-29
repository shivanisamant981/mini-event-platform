const express= require("express");
const router=express.Router();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const User=require("../models/user.model");

router.post("/register",async(req,res)=>{
        try{
            //first need to destructure the body value 
            const {name,email,password}=req.body;

            //step 1 me we need to check if user already exist
            const existuser=await User.findOne({email});
            if(existuser){
                return res.status(400).json({message:"bhai tu login me ja"});
            }
            //step2 abb jab exist nhi krta to hum usko save krne ka bandobas krte hai
            //Step2:Hash password
            const salt=await bcrypt.genSalt(10);
            const hashPassword=await bcrypt.hash(password,salt);
            //abb user create krte hai mongodb me 
            const user=await User.create({
                name,
                email,
                password:hashPassword,
            });

            //abb tu jwt token generate krr jo ki hum uske browser ko bhejne waale hai
            const token=jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn:"7d"}
                
            );
            res.status(200).json({
                message:"User registered succesfully",
                token,
            });
        }catch(error){
            res.status(500).json({message:error.message});
        }



});
router.post("/login",async(req,res)=>{

        try{
            const {email, password}=req.body;

            //1 check user
            const user=await User.findOne({email});
            if(!user){
                 return res.status(400).json({message:"Invalid credential"});

            }
            //agr bhai exist krta hai to compare krr hash or jwt bhi
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                 return res.status(400).json({message:"Invalid credential"});
            }
            //token gnerate krr taaki vo login rahe 7 din tak
            const token=jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn:"7d"}
            )
            res.json({
                message:"Login successsfully",
                token,
            });

        }catch(error){
            res.status(500).json({message:error.message})
        }


})

module.exports=router;