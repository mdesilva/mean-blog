var User = require("../datasets/users.js")
var mongoose = require('mongoose');


module.exports.editBlogInfo = function(req,res){
  var username = req.body.username;
  var blogTitle = req.body.blogTitle;
  var blogBio = req.body.blogBio;
  User.findOneAndUpdate({username:username}, {blogTitle: blogTitle, blogBio: blogBio}, function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      res.json({status: 200, message: "Blog profile successfully updated"});
    }
  })
}

module.exports.editUserInfo = function(req,res){
  var username = req.body.username;
  var userBio = req.body.userBio;
  User.findOneAndUpdate({username: username},{userBio: userBio}, function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      res.json({status: 200, message: "User profile successfully updated"})
    }
  } )
}


module.exports.getBlogInfo = function(req,res){
  var username = req.body.username;
  User.findOne({username: username}, {"blogTitle":true, "blogBio":true, "userBio":true,"fullname": true, _id:false}, function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      res.json(docs);
    }
  })

}
module.exports.createPost = function(req,res){
  var username = req.body.username;
  var postTitle = req.body.title;
  var postContent = req.body.content;
  User.findOneAndUpdate({username: username}, {$push: {"posts": {title: postTitle, content: postContent}}}, function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      //console.log("New post created successfully");
      res.json({status:200, message:"New post created successfully !"})
    }
  })
}

module.exports.getPosts = function(req,res){
  var username = req.body.username;
  //$unwind: give each sub document in an array to be its own document, with all the fields of the main document
  //$project: restrict the fields that are returned
  User.aggregate({$match: {username: username}}, {$unwind: "$posts"}, {$project: {posts: 1, _id:0}}, {$sort: {'posts': 1}}, function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      res.json(docs);
    }
  })
}

module.exports.getPostById = function(req,res){
  var username = req.body.username;
  var postId = req.body.postId;
  User.find({username: username}, {posts: {$elemMatch: {_id: postId}}}, function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      res.json(docs[0].posts) //send back the requsted post only
    }
  })
}

module.exports.updatePost = function(req,res){
  var username = req.body.username;
  var postId = req.body.postId;
  var title = req.body.title;
  var content = req.body.content;

  User.update({username: username, "posts._id": postId}, {'$set': {'posts.$.title': title, 'posts.$.content': content}}, function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      //console.log("Post updated succesfully!")
      res.json({status:200, message:"Post updated succesfully!"});
    }
  })

}

module.exports.deletePost = function(req,res){
  var username = req.body.username;
  var postId = req.body.postId; //delete post by looking it up by its id
  User.update({username: username}, { $pull: { 'posts': {_id: postId}}}, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      //console.log("Post deleted successfully!");
      res.json({status:200, message:"Post deleted successfully!"});
    }
  })
}
