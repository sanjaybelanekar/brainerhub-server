const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: Number,
  name: { first: String, last: String },
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", UserSchema, "users");

module.exports = UserModel;
