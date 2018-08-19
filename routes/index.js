var express = require("express");
var router = express.Router();
var User = require("../models/user");

// Index Route - Landing Page
router.get("/", function(req, res){
    
    res.render("home");
    
});

//=======================
// Authentication routes
//=======================

router.get("/register", function(req, res){
    res.render("register");
});


module.exports = router;