const express=require("express")
const route=express.Router()
const ChatController=require("../controllers/chatController")
    route.get("/:id",ChatController.getChatWithUser)
    route.get("/:senderId/:receivedId",ChatController.compareGetIdRoomChat)
module.exports=route