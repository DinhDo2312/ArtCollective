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
  // if (req.user) {
  //   var id = req.id;
  //   return res.render("signup");
  // }
  //Otherwise send them to the signup page.
  res.render("home");
});


router.get('/join', function(req,res){
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup");
})

router.get("/login", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("user");
  }
  res.render("login");
});

router.get("/create",function(req,res){
  console.log(req.user);
  res.render("create");
});

router.get("/browsecollectives", function(req, res) {
  console.log(req.body);
  db.Collective.findAll().then(function(found) {
    console.log(found);
    res.render("browsecollectives", found);

  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

router.get("/collective/:id", isAuthenticated, function(req, res) {
  var id = req.params.id;
  db.Collective.findOne({
    where: {id: id},
    include: [db.Submission, db.Comment]
  }
  ).then(function(resultObj) {
    var textArr = []
    var audioArr = []
    var imageArr = []
    var result = resultObj.Submissions
    
    result.forEach(function(e){
      switch (e.type) {
        case "image":
        imageArr.push(e);
        break;
        case "text":
        textArr.push(e);
        break;
        case "audio":
        audioArr.push(e);
        break;
        default:
        console.log('')
      }
    })

    resultObj.textObj = textArr;
    resultObj.audioObj = audioArr;
    resultObj.imageObj = imageArr;

    // res.json(resultObj);
    res.render("collective", resultObj);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});

router.get("/submission/:id", function(req, res) {
  var id = req.params.id;
  db.Submission.findOne({
    where: {id: id},
    // include: [db.Collective, db.Comment, db.User],
  }
  ).then(function(found) {
    console.log(found);
    // res.json(found);
    if (req.user) {
      found.currentUser = req.user.id;
    } else {
      found.currentUser = null;
    }
    res.render("submission", found);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});

router.get("/user/:id", isAuthenticated, function(req, res) {
  var id = req.params.id;
  db.User.findOne({
    where: {id: id},
    include: [db.Collective]
  }
  ).then(function(resultObj) {
    console.log(resultObj);
    // res.json(resultObj);
    res.render("user", resultObj);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});

router.get("/createcollective", function(req, res) {
  res.render("createcollective");
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  var id = req.user.id
  res.json("/user/" + id);
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

router.get('/home', function(req,res){
  res.render('home');
});

router.get('/api/submissions', function(req,res){
  console.log(req.query)
  db.Submission.findAll({
    where:{
      id:{
        $between: [+req.query.id,+req.query.id+4],
      }
    }
  }).then(function(resultObj){
    console.log(resultObj);
    res.json(resultObj);
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
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id
    });
  }
});

// navigate to create submission page, get user's collectives for dropdown list
router.get("/createsubmission", function(req, res) {
  console.log(req.body);
  var userId = req.user.id;
  db.User.findOne({
    where: {id: userId},
    include: [db.Collective]
  }).then(function(found) {
    console.log(found);
    // res.json(found);
    res.render("createsubmission", found);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// create media submit
router.post("/createsubmission", function(req, res) {
  console.log(req.body);
  db.Submission.create({
    title: req.body.title,
    file: req.body.url,
    description: req.body.description,
    type: req.body.type,
    UserId: req.user.id,
    CollectiveId: req.body.collectiveId
  }).then(function(submission) {
    console.log(submission);
    res.json(submission);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

router.post("/collective/:id/comment", function(req, res) {
  var userId = req.user.id;
  var collectiveId = req.params.id;
  db.Comment.create({
    text: req.body.text,
    UserId: userId,
    CollectiveId: collectiveId
  }).then(function() {
    res.redirect("/collective/" + collectiveId);
    // location reload instead?
  });
});

router.post("/submission/:id/comment", function(req, res) {
  var userId = req.user.id;
  var subId = req.params.id;
  db.Comment.create({
    text: req.body.text,
    UserId: userId,
    SubmissionId: subId
  }).then(function() {
    res.redirect("/submission/" + collectiveId);
    // location reload instead?
  });
});

router.put("/submission/:id", function(req, res) {
  if (req.user) {
    if (req.user.id === req.body.ownerId) {
      console.log(req.body);
      var subId = req.params.id;
      db.Submission.update({
        title: req.body.title,
        description: req.body.description
      },
      {where: {id: subId}}
      ).then(function(update) {
        console.log(update);
        // res.redirect("/submission/" + subId);
        res.end();
        // location reload instead?
      }).catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
    } else {
      res.end();
    }
  } else {
    res.end();
  }
});

router.put("/user/:id", function(req, res) {
  console.log(req.body);
  var userId = req.user.id;
  db.User.update({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    bio: req.body.bio,
    avatar: req.body.avatar
  },
  {where: {id: userId}}
  ).then(function(update) {
    console.log(update);
    res.redirect("/user/" + userId);
    // location reload instead?
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});


// user landing page
router.get("/user/:id", function(req, res) {
  var id = req.params.id;
  db.Submission.findAll({
    where: {
      UserID: id
    }
  }).then(function(resultObj){
    console.log(resultObj);
    resultObj.resultObj = resultObj;
    res.render("user", resultObj);
  })
})


module.exports = router;