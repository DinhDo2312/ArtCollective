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

router.get("/collective", isAuthenticated, function(req, res) {
  res.render("collective");
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

// TEST CREATE USER AND MEDIA RECORDS
// =================================
router.get("/api/usermedia", function(req, res) {
  console.log(req.body);
  db.User.update({
    username: 'testman2',
    Media: [
      {
        title: "testmedia2"
      }
    ]
  },
  {where: { id: 2}}, 
  {
    include: [ db.Media ]
  }
  ).then(function(data) {
    console.log(data);
    res.json(data);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});
// =================================

// SEQUELIZE TEMPLATES
// =================================
// create new record
router.get("/api/testcreate", function(req, res) {
  console.log(req.body);
  db.User.create({
    username: 'testman3',
    email: 'test3@test.com',
    password: 'test'
  }).then(function(user) {
    console.log(user);
    res.json(user);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});


// update existing record
router.get("/api/testupdate", function(req, res) {
  console.log(req.body);
  db.User.update({
    username: 'updatetestman1'
  },
  {where: {id: 1}}
  ).then(function(update) {
    console.log(update);
    res.json(update);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// find record
router.get("/api/testfindall", function(req, res) {
  console.log(req.body);
  db.User.findAll({
    where: {id: 1}
  }
  ).then(function(found) {
    console.log(found);
    res.json(found);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// find record and associated records
router.get("/api/testfindrelated", function(req, res) {
  // console.log(req.body);
  // db.User.findAll({
  //   where: {id: 2},
  //   include: [db.Media]
  // }
  // ).then(function(found) {
  //   console.log(found);
  //   res.json(found);
  // }).catch(function(err) {
  //   console.log(err);
  //   res.json(err);
  //   // res.status(422).json(err.errors[0].message);
  // });
  db.User.findAll({
    where: {id: 2}
  }).then(function(user) {
    user.getMedias();
    // res.json(user);
  });
});
// create associated records
router.get("/api/usermedia", function(req, res) {
  db.User.addMedia({
    where: {
      UserId: '2'
    }
  }).then(function(media) {
    res.json(media)
  })
});

// join tables?


// =================================
module.exports = router;