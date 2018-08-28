var express = require("express");
var router = express.Router();
var Photo = require("../models/photos");
var Comment = require("../models/comment");
var middleware = require("../middleware")

router.get("/photos/:id/comments/new" , middleware.isLoggedIn , function(req, res){
    
    Photo.findById(req.params.id, function(err, foundPhoto){
        
        if (err) {
            console.log(err);
            res.redirect("/photos/" + req.params.id);
        } else {
            res.render("comments/new",{ Photo: foundPhoto });
        }
        
    });
   
});

router.post("/photos/:id/comments/new", middleware.isLoggedIn , function(req, res){
    
    Photo.findById(req.params.id, function(err, foundPhoto){
        if (err) {
            console.log(req.params.id);
            console.log(err);
            res.redirect("/photos");
        } else {
            Comment.create({text: req.body.newcomment}, function(err, newComment){
                if (err) {
                    console.log(err);
                    res.redirect("/photos");
                } else {
                    console.log(req.user._id);
                    console.log(req.user.username);
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundPhoto.comments.push(newComment);
                    foundPhoto.save();
                    req.flash("success", "Successfully added your comment !!");
                    res.redirect("/photos/" + foundPhoto._id );
                }
            });
        }
    });
    
    
});

module.exports = router;
