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
  settings: [{headerColor: String, postsColor: String}],
  drafts: [{title: String, content: String}],
  posts: [{title: String, content: String, date: {type: Date, default: Date.now }, categories:[{category:String}], comments:[{username:String, comment:String, date:{type:Date, default: Date.now}}]}]
})

module.exports = mongoose.model('User', UserModelSchema);
