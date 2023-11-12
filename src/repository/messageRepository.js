const messageModel=require("../models/messageModel")
const chatModel=require("../models/chatModel")

class MessageController{
    async findChat(senderId,receivedId){
        try {
            const chat=await chatModel.findOne({
                users:{$all:[senderId,receivedId]}
            })
            return chat
        } catch (error) {
            res.json(error)
        }
    }
    async messageWith(req,res){
        try {
            const {senderId,receivedId,message}=req.body
            const existingChat =await this.findChat(senderId,receivedId)
            if (existingChat) {
                const messages=await messageModel.create({
                    chatId:existingChat._id,
                    senderId,
                    message
                })
                res.json({message:"Add message successfully",messages})
            }else{
                const chat = await chatModel.create({
                    users:[senderId,receivedId]
                })
                const messages=await messageModel.create({
                    chatId:chat._id,
                    senderId,
                    message
                })
                res.json({message:"Add message successfully",messages})
            }
        } catch (error) {
            res.json("Internal server error")
        }
    }
}
module.exports=new MessageController()