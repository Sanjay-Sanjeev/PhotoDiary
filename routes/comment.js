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

router.get("/photos/:id/comments/:commentId/edit", middleware.checkCommentOwnership ,function(req, res){
    
    Comment.findById(req.params.commentId, function(err, foundComment) {
        
        if (err) {
            
            console.log(err);
            req.flash("error","Oops!! Something went wrong! Please try again");
            res.redirect("/photos");
            
        } else {
            
            res.render("comments/edit", { photo_id: req.params.id, Comment: foundComment  });
        }
        
    });
    
    
});

router.put("/photos/:id/comments/:commentId",  middleware.checkCommentOwnership, function(req, res){
    
    Comment.findByIdAndUpdate( req.params.commentId, req.body.comment  ,function(err, updatedComment){
        
        if (err) {
            console.log(err);
            req.flash("error","Oops! Something went wrong!! Please try again!");
            res.redirect("/photos/" + req.params.id);
            
        } else {
            
            res.redirect("/photos/" + req.params.id);
        }
        
    } );
    
});

router.delete("/photos/:id/comments/:commentId", middleware.checkCommentOwnership ,function(req, res){
    
    Comment.findByIdAndRemove( req.params.commentId, function(err){
        if (err) {
            console.log(err);
            req.flash("error","Oops! Something went wrong!! Please try again!");
            res.redirect("/photos/" + req.params.id);
            
        } else {
            req.flash("success", "Comment deleted successfully!!");
            res.redirect("/photos/" + req.params.id);
        }
    } );
});

module.exports = router;
