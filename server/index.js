const express= require("express");

const app=express();
const cors=require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes=require("./routes/authRoutes")
app.use(cors());
app.use(express.json());




app.get("/test",(req,res)=>{
    res.send("hello bro how are you");
})
connectDB()
app.use("/api/auth",authRoutes);



const PORT= process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})