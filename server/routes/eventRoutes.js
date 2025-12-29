const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");


router.post("/",authMiddleware,(req,res)=>{
    res.send("created event");

})
router.get("/",(req,res)=>{
    res.send("got all event");
})
router.put("/:id",authMiddleware,(req,res)=>{
    res.send("updated event");
})
router.delete("/:id",authMiddleware,(req,res)=>{
    res.send("Deleted even");
});
module.exports=router;