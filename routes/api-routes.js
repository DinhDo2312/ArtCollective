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
});

router.get("/login", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("user");
  }
  res.render("login");
});


router.get("/collectives", function(req, res) {
  console.log(req.body);
  db.Collective.findAll({
    include:[{
      model: db.User,
      through: {where: {role: "admin"}}
    }]
  }).then(function(found) {
    res.render("collectives", found);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});

router.get("/collective/:id", function(req, res) {
  var id = req.params.id;
  db.Collective.findOne({
    where: {id: id},
    include: [db.Submission, db.Comment, db.User]
  }
  ).then(function(resultObj) {
    var textArr = []
    var audioArr = []
    var imageArr = []
    // var title = [{title: resultObj.title}]
    
    var result = resultObj.Submissions
    // loop through submissions and separate into 3 arrays for rendering to the appropriate carousel in handlebars
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
    // resultObj.title = title;

    //loop through users and see if current user is a member of the collective
    var isMember = false;
    if (req.user) {
      resultObj.Users.forEach(function(user) {
        if (req.user.id === user.id) {
          isMember = true;
        }
      });
    }
    resultObj.isMember = isMember;


    // res.json(resultObj);
    console.log("--------------------------------------------------------")
    // console.log(title);
    res.render("collective", resultObj);
    // res.json(resultObj);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});

router.post("/collective/:id/joinOrLeave", function(req, res) {
  var isMember = req.body.isMember;
  if (req.user) {
    var userId = req.user.id;
    var id = req.params.id;
    db.Collective.findOne({
      where: {id: id}
    }).then(function(collective) {
      console.log(isMember);
      if (isMember === "false") {
        collective.addUser(userId, { through: { role: 'contributor' }}).then(function() {
          res.send("/collective/" + id);
        });
      } else {
        collective.removeUser(userId).then(function() {
          res.send("/collective/" + id);
        });
      }
    });
  } else {
    res.send("/login");
  }
});

router.get("/submission/:id", function(req, res) {
  var resultObj = {};
  var subId = req.params.id;
  db.Submission.findOne({
    where: {id: subId},
    include: [db.Collective, db.User],
  }
  ).then(function(submission) {
    // res.json(submission);
    if (req.user) {
      submission.dataValues.currentUser = req.user.id;
    } else {
      submission.dataValues.currentUser = null;
    }
    resultObj.submission = submission;
    db.Comment.findAll({
      where: {SubmissionId: subId},
      include: [db.User]
    }).then(function(comments) {
      resultObj.comments = comments;
      res.render("submission", resultObj);
      // res.json(resultObj);
    });
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});

router.get("/createcollective", function(req, res) {
  if(!req.user){
    return res.redirect("/login");
  }
  res.render("createcollective");
});

router.post("/createcollective",function(req,res){
  var userID = req.user.id;
  if(!userID){
    return res.send("/login");
  }
  db.Collective.create({
    title: req.body.title,
    description: req.body.description,
  }).then(function(collective) {
    collective.addUser(userID, { through: { role: "admin" }});
    res.send("/collective/" + collective.id);
  });
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  var id = req.user.id;
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

router.get("/home", function(req,res){
  res.render("home");
});

router.get("/api/submissions", function(req,res){
  db.Submission.findAll({
    where:{
      id:{
        $between: [+req.query.id,+req.query.id+4],
      }
    }
  }).then(function(resultObj){
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
  if (!req.user){
    return res.redirect("/login");
  }
  db.User.findOne({
    where: {id: req.user.id},
    include:[{
      model: db.Collective,
      through: {where: {userId:req.user.id}}
    }]
  }).then(function(found) {
    res.render("createsubmission", found);
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});

// create media submit
router.post("/createsubmission", function(req, res) {
  if(!req.user){
    res.send("/login");
  }
  db.Submission.create({
    title: req.body.title,
    file: req.body.media,
    description: req.body.description,
    type: req.body.type,
    UserId: req.user.id,
    CollectiveId: req.body.collectiveId
  }).then(function(submission) {
    res.send("/submission/"+submission.id);
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
  if(req.user){
    var userId = req.user.id;
  } else {
    return res.send("/join");
  }
  var subId = req.params.id;
  db.Comment.create({
    text: req.body.text,
    UserId: userId,
    SubmissionId: subId,
  }).then(function() {
    return res.send("/submission/" + subId);
    // location reload instead?
  });
});

router.put("/submission/:id", function(req, res) {
  if (req.user) {
    if (req.user.id == req.body.ownerId) {
      var subId = req.params.id;
      db.Submission.update({
        title: req.body.title,
        description: req.body.description
      },
      {where: {id: subId}}
      ).then(function(update) {
        // res.redirect("/submission/" + subId);
        res.end();
      }).catch(function(err) {
        console.log(err);
        res.json(err);
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
  db.User.findOne({
    where: {id: id},
    include: [db.Submission]
  }).then(function(resultObj){
    console.log(resultObj);
    if (req.user) {
      resultObj.dataValues.currentUser = req.user.id;
    } else {
      resultObj.dataValues.currentUser = null;
    }
    res.render("user", resultObj);
  });
});

// edit user page
router.get("/user/:id/edit", function(req, res){
  var userId = req.params.id;
  db.User.findOne({
    where: {id:userId}
  }).then(function(found) {
    res.render("edituser", found);
  });
});


// this is an update
router.post("/user/:id/edit", function(req, res) {
  var userId = req.params.id;
  db.User.update({
    email: req.body.email,
    username: req.body.username,
    bio: req.body.bio,
    avatar: req.body.avatar
  },
  {where: {id: userId}}
  ).then(function(update) {
    console.log(update);
    res.send("/user/" + userId);
    // location reload instead?
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});


module.exports = router;