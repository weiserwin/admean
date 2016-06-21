var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
 });

var Users = module.exports = mongoose.model('Users',usersSchema)
