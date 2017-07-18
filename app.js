var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var userController = require(__dirname + '/server/controllers/user-controller');
var blogController = require(__dirname + '/server/controllers/blog-controller');
var app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', console.error.bind('Database error!'));
db.once('open', function(){
  console.log("Connected to database!")
});

app.use(bodyParser.json());
app.use('/private', express.static('private'));
app.use(bodyParser.urlencoded({extended: false }));


app.use(session({secret: 'mysecretkey', cookie: { expires: false}}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

app.listen(process.env.PORT || 3000);

app.get("/", function(req,res){
  res.sendFile(__dirname + '/index.html');
})


app.get("/:username", function(req,res){
  res.redirect("/#!/viewBlog/" + req.params.username)
})


//app auth routes
app.post("/api/createUser", userController.createUser);


app.post("/api/loginUser", userController.authenticateUser, function(req,res){
  res.json(req.user); //send back the user, which is stored in a cookie accessible by req.user
});


//check if user is logged in
app.get("/api/loggedIn",function(req,res){
  res.json({status: req.isAuthenticated(), user: req.user});
});

//log out
app.get("/api/logOut", function(req,res){
  req.logOut();
  res.sendStatus(200);
})



//app routes
app.post("/api/editBlogInfo", blogController.editBlogInfo);
app.post("/api/getBlogInfo", blogController.getBlogInfo);
app.post("/api/editUserInfo", blogController.editUserInfo);
app.post("/api/createPost", blogController.createPost);
app.post("/api/getPosts", blogController.getPosts);
app.post("/api/getPostById", blogController.getPostById);
app.post("/api/updatePost", blogController.updatePost);
app.post("/api/deletePost", blogController.deletePost);
