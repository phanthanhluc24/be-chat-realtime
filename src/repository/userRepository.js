const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
class UserRepository {
  async register({ user_name, email, password }) {
    const hashPassword = await bcrypt.hash(password, 10);
    userModel.create({
      user_name,
      email,
      password: hashPassword,
    });
  }

  async login({ res, email, password }) {
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(400).json("invalid credentials");
        }
        const isPasswordVal = await bcrypt.compare(password, user.password);
        if (!isPasswordVal) {
          return res.status(400).json("invalid credentials");
        }
        const token = jwt.sign(
          { _id: user._id, user_name: user.user_name },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("token", token, { httpOnly: true });
    } catch (error) {
        res.status(501).json("Internal Server Error")
    }
  }

  async currentUser(req,res){
    try {
        const token=req.headers.authorization.split(" ")
        jwt.verify(token[1],process.env.SECRET_KEY,(err,decoded)=>{
            if (err) {
                res.status(501).json("Invalid token")
            }
            res.json(decoded)
        })
    } catch (error) {
        res.status(501).json("User undefine")
    }
  }
}

module.exports = new UserRepository();
