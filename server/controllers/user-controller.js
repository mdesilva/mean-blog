var User = require('../datasets/users.js')
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports.createUser = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var fullname = (firstname + " " + lastname)
  var blogTitle = req.body.blogTitle;
  var blogBio = req.body.blogBio;
  User.findOne({username: username}, function(err,user){
    if(user){ //if a user is found
      res.json({message: "User already exists!"})
    }
    else{
      var user = new User();
      user.username = username;
      user.firstname = firstname;
      user.lastname = lastname;
      user.fullname = fullname;
      user.blogTitle = blogTitle;
      user.blogBio = blogBio;
      bcrypt.hash(password, null,null, function(err,hash){ //hash the password asyncronously and store it in the user.password field
        user.password = hash;
      });
      user.save(function(err,docs){
        if(err){
          console.log(err)
        }
        else{
          res.json({message: "User created"})
        }
      });
    }
  })
}

//authentication method
passport.use(new LocalStrategy({passReqToCallback: true},
  function(req,username,password,done){
    User.findOne({username: username}, function(err,user){
      if(err){
        console.log(err);
        return done(err);
      }
      if(!user){
        console.log("User not found");
        return done(null, false);
      }
      if(user){
        bcrypt.compare(password, user.password, function(err,res){
          if(res){
            console.log("User authenticated!");
            return done(null,user)
          }
          else{
            console.log("Wrong password");
            return done(null, false);
          }
        })
      }
    })
  }));

//first authenticate the user, then handle the response back on the route
module.exports.authenticateUser = passport.authenticate('local')

passport.serializeUser(function(user,done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done){
  User.findById(id, function(err,user){
    done(err,user);
  });
});
