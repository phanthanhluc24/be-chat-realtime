const chatModel=require("../models/chatModel")
class ChatRepository{
    async getChatWithUser(req,res){
        const {id}=req.params
        try {
            const chatWithUser=await chatModel.find({users:{$in:[id]}})
            res.status(201).json(chatWithUser)
        } catch (error) {
            res.status(501).json(error)
        }
    }

    async compareGetIdRoomChat(req,res){
        const senderId=req.params.senderId
        const receivedId=req.params.receivedId
        try {
            const chatId=await chatModel.findOne({users:{$all:[senderId,receivedId]}})
            res.status(201).json(chatId)
        } catch (error) {
            res.status(501).json("Fail to get chat room")
        }
    }
}

module.exports=new ChatRepository()