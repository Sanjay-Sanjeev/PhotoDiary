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


router.post("/register", function(req, res){
    
    var newUser = new User({username: req.body.user.name });
    User.register( newUser, req.body.user.password ,function(err, createdUser){
     
     if (err) {
         console.log(err);
         res.redirect("back");
     } else {
         console.log(createdUser.username + " User Created");
         req.flash("success", "Successfully Registered! Welcome to PhotoDiary " + createdUser.username);
         res.redirect("/photos");
     }
        
    });
});




module.exports = router;