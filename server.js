const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const http = require("http");
const cors=require("cors");
const cookie=require("cookie-parser")
const route = require("./src/routers");
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
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cookie())

app.use(cors(crossOptions))

// router
route(app)
server.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
