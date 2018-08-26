var express = require("express");
var router = express.Router();
var Photo = require("../models/photos");
var middleware = require("../middleware");

// Index Route - show all photos
router.get("/photos", function(req, res){
    
    Photo.find({}, function(err, Photos){
        
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            
            res.render("photos/photos", { Photos: Photos } );   
        }
        
    });
    
    
});

// New Route - show new photo diary form
router.get("/photos/new", middleware.isLoggedIn  , function(req, res) {
    res.render("photos/new");
});

// Create Route - crete new photo diary and redirect somewhere - POST
router.post("/photos", middleware.isLoggedIn , function(req, res){
    
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var title = req.body.title;
    var image = req.body.image;
    var desc =  req.body.desc;
    var newPhoto = {title: title, image: image, desc: desc, author: author  };
    Photo.create( newPhoto , function(err, createdPhoto){
        if (err) {
            console.log(err);
            res.redirect("/photos");
        } else {
            
            res.redirect("/photos");
        }
    } );
    
    
});

// Show route - show specific photo using id

router.get("/photos/:id", function(req, res) {
    
    Photo.findById(req.params.id, function(err, foundPhoto){
        
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            
            res.render("photos/show", { Photo: foundPhoto });
            
        }
        
    });
    
    
});

// Edit route - edit particular photo
router.get("/photos/:id/edit", middleware.checkPhotoOwnership , function(req, res) {
    
    Photo.findById(req.params.id, function(err, foundPhoto){
        
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("photos/edit", { Photo: foundPhoto });
        }
        
    });
    
    
});

// Update Route - Edit details of particular photo using PUT route
router.put("/photos/:id", middleware.checkPhotoOwnership , function(req, res){
    
    Photo.findByIdAndUpdate(req.params.id, req.body.photo , function(err, updatedPhoto){
        
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/photos");
        }
        
    });
    
});

// DESTROY Route - To delete a particular photo
router.delete("/photos/:id", middleware.checkPhotoOwnership , function(req, res){
    
    Photo.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/photos");
        }
    });
    
});

module.exports = router;