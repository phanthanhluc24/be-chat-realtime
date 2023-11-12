const express=require("express")
const route=express.Router()
const ChatController=require("../controllers/chatController")
    route.get("/:id",ChatController.getChatWithUser)

module.exports=route