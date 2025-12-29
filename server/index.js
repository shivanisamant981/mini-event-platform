const express= require("express");

const app=express();
const cors=require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes=require("./routes/authRoutes");
const eventRoutes=require("./routes/eventRoutes")
const authMiddleware = require("./middleware/authMiddleware");
app.use(cors());
app.use(express.json());




app.get("/test",(req,res)=>{
    res.send("hello bro how are you");
})
connectDB()
app.use("/api/auth",authRoutes);
app.use("/api/event",eventRoutes);

app.get("/api/protected",authMiddleware,(req,res)=>{
    res.json({
        message:"Access granted",
        userId:req.user.id,
    });
});



const PORT= process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})