var mongoose = require('mongoose');


var UserModelSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  fullname: String,
  blogTitle: String,
  blogBio: String,
  userBio: String,
  posts: [{title: String, content: String, date: {type: Date, default: Date.now }, categories:[{category:String}]}]
})

module.exports = mongoose.model('User', UserModelSchema);
