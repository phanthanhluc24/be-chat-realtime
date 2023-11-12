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
}

module.exports=new ChatRepository()