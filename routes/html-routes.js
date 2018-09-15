// Requiring path to so we can use relative routes to our HTML files
var express = require('express')
var router = express.Router();
// Requiring our custom middleware for checking if a user is logged in






// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page


module.exports = router;
