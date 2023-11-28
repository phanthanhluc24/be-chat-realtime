const userRoute=require("./userRouter")
const messageRoute=require("./messageRouter")
const chatRoute=require("./chatRouter")
function route(app){
    app.use("/user",userRoute)
    app.use("/message",messageRoute)
    app.use("/member",chatRoute)
}
module.exports=route