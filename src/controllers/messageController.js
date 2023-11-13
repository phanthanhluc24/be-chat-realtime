const messageRepository=require("../repository/messageRepository")
class MessageController{
    async chatWith(req,res){
        try {
             await messageRepository.messageWith(req,res)
        } catch (error) {
            console.log(error);
        }
    }

    async getMessageConversationByChatId(req,res){
        try {
            await messageRepository.getMessageConversationByChatId(req,res)
        } catch (error) {
            res.status(501).json(error)
        }
    }
}
module.exports=new MessageController()