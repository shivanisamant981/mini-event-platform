const mongoose=require("mongoose");

const eventSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    dateTime:{
        type:Date,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    capacity:{
        type:Number,
        required:true,
    },
    attendeesCount:{
        type:Number,
        default:0,
    },
    attendees:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    imageUrl:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true});

const Event=mongoose.model("Event",eventSchema);
module.exports=Event;