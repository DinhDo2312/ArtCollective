// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var router = express.router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.json("/members");
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
  res.redirect("/");
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

// TEST CREATE DUMMY MEDIA RECORD
// =================================
router.get("/api/dummymedia", function(req, res) {
  console.log(req.body);
  db.Media.create({
    title: 'test media',
    description: 'lakhlashdlghasdg',
    UserId: 1
  }).then(function() {
    res.json(res);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});
// =================================

// TEST SEND DUMMY MEDIA AND USER
// =================================
router.get("/api/media/:id", function(req, res) {
  var id = req.params.id;

  console.log(req.body);

  var resultObj = {};

  db.Media.findOne({
    where: {
      id: id
    }
  }).then(function(mediaData) {
    resultObj.mediaObj = mediaData;
    db.User.findOne({
      where: {
        id: mediaData.UserId
        // **experiment with "include", may get to lose the second findAll
      }
    }).then(function(userData) {
      resultObj.userObj = userData;
      // RELIES ON HANDLEBARS
      res.render("media", resultObj);
      // ============================
      console.log(resultObj);
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});
  // =================================
module.exports = router;