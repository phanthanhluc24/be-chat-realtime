const messageRepository=require("../repository/messageRepository")
class MessageController{
    async chatWith(req,res){
        try {
             await messageRepository.messageWith(req,res)
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports=new MessageController()