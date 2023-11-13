const ChatRepository=require("../repository/chatRepository")
class ChatController{
    async getChatWithUser(req,res){
        try {
            await ChatRepository.getChatWithUser(req,res)
        } catch (error) {
            res.status(501).json("Internal server error")
        }
    }

    async compareGetIdRoomChat(req,res){
        try {
            await ChatRepository.compareGetIdRoomChat(req,res)
        } catch (error) {
            res.status(501).json("Internal server error")
        }
    }
}
module.exports=new ChatController()