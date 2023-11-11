const UserRepository = require("../repository/userRepository");

class UserController {
  async register(req, res) {
    const { user_name, email, password } = req.body;
    try {
      const userRegister = await UserRepository.register({
        user_name,
        email,
        password,
      });
      return res
        .status(201)
        .json({ message: "create user successfully", userRegister });
    } catch (error) {
      return res.status(501).json("create user fail");
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      await UserRepository.login({ res, email, password });
      return res.status(201).json("login successfully");
    } catch (error) {
      return res.status(501).json("fail to login");
    }
  }

  async currentUser(req,res){
    try {
        await UserRepository.currentUser(req,res)
    } catch (error) {
        res.json(501).status("User undefine")
    }
  }
}

module.exports = new UserController();
