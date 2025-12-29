const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb conected");

    }catch(error){
        console.error("mongoose connection failed",error.message);
        process.exit(1);
    }



}

module.exports=connectDB