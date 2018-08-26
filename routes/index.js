var express = require("express");
var router = express.Router();
var passport = require("passport");
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
    
    var newUser = new User({username: req.body.username });
    User.register( newUser, req.body.password ,function(err, createdUser){
     
     if (err) {
         console.log(err);
         req.flash("error", err.message);
         return res.render("register");
     } 
         passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Registered! Welcome to PhotoDiary " + createdUser.username);
            res.redirect("/photos"); 
         });
        
    });
});


//login route
router.get("/login", function(req, res) {
    res.render("login", { message: req.flash("error") });
});

//login route POST
router.post("/login", passport.authenticate("local", {
    successRedirect: "/photos",
    failureRedirect: "/login",
    failureFlash: "Please check Username or Password enetered!",
    successFlash: "Welcome to PhotoDiary!" 
    
})  , function(req, res){});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Tata!! See you next time!! Come back soon!");
    res.redirect("/photos");
});


module.exports = router;