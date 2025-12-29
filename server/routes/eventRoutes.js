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
module.exports=router;