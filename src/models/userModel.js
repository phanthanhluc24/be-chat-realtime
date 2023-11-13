const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  user_name: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: {type:String, require:true}
},{
    timestamps:true
});

const User=mongoose.model("users",userModel)
module.exports=User