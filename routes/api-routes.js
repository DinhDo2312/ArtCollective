// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var express = require("express");
var router = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//       return next();

//   res.redirect('/');
// }


router.get("/", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.render("collective");
  }
  //Otherwise send them to the signup page.
  res.render("signup");
});

router.get("/login", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("collective");
  }
  res.render("login");
});

router.get("/create",function(req,res){
  console.log(req.user)
  res.render("create");
});

router.get('/createcollective',function(req,res){
  res.render('createcollective')
})

router.get("/collective", isAuthenticated, function(req, res) {
  var id = req.params.id;
  var resultObj = {};
  var mediaObj = [
    {
      mediaObj: {
        title: 'bigbooty',
        description: 'an homage',
        id: 1,
        type: 'img',
        userId: 1,
        file: "images/pokemon.jpg",
      }
    },
    {
      mediaObj: {
        title: 'penguin',
        description: "it's a penguin dumbass",
        id: 2,
        type: 'img',
        userId: 1,
        file: "images/penguin.jpg"
      }
    },
    {
      mediaObj: {
        title: 'dumb dog',
        description: "Still smarter than me",
        id: 3,
        type: 'img',
        userId: 1,
        file: "images/dog.jpg"
      }
    },
    {
      mediaObj: {
        title: 'desert',
        description: 'none',
        id: 4,
        type: 'img',
        userId: 1,
        file: "images/desert.jpg"
      }
    },
    {
      mediaObj: {
        title: 'piggy',
        description: 'little piggy',
        id: 5,
        type: 'img',
        userId: 1,
        file: "images/piggy.jpg"
      }
    }
  ];
  resultObj.mediaObj = mediaObj;

  res.render('collective', resultObj);
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.json("/collective");
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
  console.log(req.body);
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    res.redirect(307, "/api/login");
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.render("login");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  }
  else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;