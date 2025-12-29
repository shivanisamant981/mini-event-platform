const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const Event=require("../models/event.model");


router.post("/",authMiddleware,async(req,res)=>{

        try{
            const{
                title,
                description,
                dateTime,
                location,
                capacity,
                imageUrl,
            }=req.body;
            

            const event=await Event.create({
                title,
                description,
                dateTime,
                location,
                capacity,
                imageUrl,
                createdBy:req.user.id,
            });

            res.status(201).json(event);

        }catch(error){
            res.status(500).json({message:error.message});
        }
});

router.get("/",async(req,res)=>{
    try{
        const events=await Event.find()
        .populate("createdBy","name email")
        .sort({dateTime:1});
        
        res.json(events);

    }catch(error){
        res.status(500).json({message:error.message});

    }
   
});
router.put("/:id",authMiddleware,async(req,res)=>{
    try{
        const event=await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({message:"Event not found"});

        }
        if(event.createdBy.toString()!==req.user.id){
            return res.status(403).json({message:"Unathorized"});
        }
        const updatedEvent=await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        res.json(updatedEvent);
    }catch(error){
        res.status(500).json({message:error.message});
    }
   


});
router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const event=await Event.findById(req.params.id);

        if(!event){
            return res.status(400).json({message:"Event not found"});
        }
        if(event.createdBy.toString()!==req.user.id){
            return res.status(403).json({message:"unauthorized"});
        }
         
        await event.deleteOne();
        res.json({message:"Event deleted successfully"});


    }catch(error){
        res.status(500).json({message:error.message});
    }
    
});

router.post("/:id/rsvp",authMiddleware,async(req,res)=>{
    try{
        const eventId=req.params.id;
        const userId=req.user.id;

        const event=await Event.findOneAndUpdate(
            {
                _id:eventId,
                $expr:{$lt:["$attendeesCount","$capacity"]},//normally mongodb queries compare field to value 
                attendees:{$ne:userId}, //but $expr lets us compare to field to field

            },
            {
                $inc:{attendeesCount:1},
                $push:{attendees:userId}, //add user to attendees array
            },
            {new:true} //return the updated event // without this mongodb would return the old version
        );
        if(!event){
            return res.status(400).json({
                message:"Event is full or user already joined come next year",
            });
        }
        res.json({
            message:"successfully joined the event",
            event,
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }

});

router.delete("/:id/rsvp",authMiddleware,async(req,res)=>{
    try{
        const eventId=req.params.id;
        const userId=req.user.id;

        const event=await Event.findOneAndUpdate(
            {
                _id:eventId,
                attendees:userId,
            },
            {
                $pull:{attendees:userId},
                $inc:{attendeesCount:-1},
            },
            {
                new:true
            }
        )
        if(!event){
            return res.status(400).json({
                message:"User is not part of this event",
            });
        }
        res.json({
            message:"successfully left the event",
            event,
        });

    }catch(error){
        res.status(500).json({message:error.message});
    }
});


module.exports=router;