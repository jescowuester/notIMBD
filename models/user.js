const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/notIMBD');

const Schema   = mongoose.Schema;

const user = new Schema({
    username: String,
    email: String,
    dateofBirth: String,
    password: String
  },{ collection: 'user-info' });
  
  const User = mongoose.model("User", user);

  module.exports = User;