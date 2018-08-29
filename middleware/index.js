var Photo = require("../models/photos");
var User = require("../models/user");
var Comment = require("../models/comment");
var middlewareObject = {};



middlewareObject.checkPhotoOwnership = function(req, res, next){
  
  if(req.isAuthenticated()){
    
    Photo.findById(req.params.id, function(err, foundPhoto){
      if (err) {
        console.log(err);
        req.flash("error", "Oops! Photo not found in database. Please try again");
        res.redirect("back");
      } else {
        if(foundPhoto.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error","Oops! You are not the owner of this photo!!");
          res.redirect("back");
        }
      }
    });
    
  }else{
      req.flash("error","Oops! Please Login..!!");
      return res.redirect("back");
  }
  
};

middlewareObject.checkCommentOwnership = function(req, res, next){
    
    if(req.isAuthenticated()){
      
      Comment.findById(req.params.commentId, function(err, foundComment){
        
        if (err) {
          console.log(err);
          req.flash("error", "Oops! Something went wrong! Please try again!");
          res.redirect("/photos/" + req.params.id);
          
        } else {
            if (foundComment.author.id.equals(req.user._id)) {
              
              next();
              
            } else {
                    req.flash("error", "You dont have permission to do that..!!");
                    res.redirect("back");
            }
        }
        
      });
        
      
    }else{
      
        req.flash("error", "Oops! Please login !!");
        res.redirect("/login");
    }
  
};


middlewareObject.isLoggedIn = function(req, res, next){
  
  if(req.isAuthenticated()){
      return next();
  }
  req.flash("error", "Oops! Please Login..!!");
  res.redirect("/login");
    
};

module.exports = middlewareObject;