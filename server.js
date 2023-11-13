const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const http = require("http");
const cors=require("cors");
const cookie=require("cookie-parser")
const route = require("./src/routers");
const socketIo=require("socket.io")
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB;
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connect success");
  })
  .catch((error) => {
    console.log("Db connect fail ",error);
    process.exit(1);
  });

  app.use(express.urlencoded({extended:true}))
  app.use(express.json())

// config cross
const crossOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cookie())

app.use(cors(crossOptions))

// router
route(app)

// socket.io chat realtime
const io=socketIo(server,{
  cors:{
    origin: "http://localhost:5173",
    methods:["GET","POST"]
  }
})
let activeUserChat=[]
io.on("connection",(socket)=>{
  // receive id from client for push to array 
  socket.on("chat-with-new-user",(newUserId)=>{
    if (!activeUserChat.some((user)=>user.userId===newUserId)) {
      activeUserChat.push({
        receivedId:newUserId,
        socketId:socket.id
      })
      console.log("user connected ",activeUserChat);

    }
  })
  // received new message from sender
  socket.on("send-new-conversation",(newMessage)=>{
    const {receivedId}=newMessage
   const received=activeUserChat.find((user)=>user.receivedId===receivedId)
    console.log("sending message to ",receivedId);
    console.log("message ",JSON.stringify(newMessage));
    if (received) {
      io.except(received.socketId).emit("received-message-from-server",newMessage)
      console.log("Message sent successfully to user: ", received.socketId);
    }
  })
  socket.on("disconnect",()=>{
    console.log("a user disconnect");
  })
})
server.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
