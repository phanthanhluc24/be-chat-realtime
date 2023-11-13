const express=require("express")
const route=express.Router()
const UserController=require("../controllers/userController")

route.post("/register",UserController.register)
route.post("/login",UserController.login)
route.get("/currentUser",UserController.currentUser)
route.get("/references",UserController.getAllUser)
route.get("/list-user-was-chat/:id",UserController.getUserWasChat)
route.get("/:id",UserController.getUserById)
module.exports=route