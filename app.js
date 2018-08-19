var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var dbURL = process.env.DATABASEURL || "mongodb://localhost:27017/photo_diary";

mongoose.connect(dbURL, { useNewUrlParser: true });

var PhotoSchema = mongoose.Schema({
    
    title: String,
    image: String,
    desc: String,
    date: { type: Date, default: Date.now}
    
});

var Photo = mongoose.model( "Photo" , PhotoSchema  );

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public" ));
app.use(bodyParser.urlencoded({ extended: true}));


// Index Route - Landing Page
app.get("/", function(req, res){
    
    res.render("home");
    
});


// Index Route - show all photos
app.get("/photos", function(req, res){
    
    Photo.find({}, function(err, Photos){
        
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            
            res.render("photos", { Photos: Photos } );   
        }
        
    });
    
    
});

// New Route - show new photo diary form
app.get("/photos/new", function(req, res) {
    res.render("new");
});

// Create Route - crete new photo diary and redirect somewhere - POST
app.post("/photos", function(req, res){
    
    Photo.create( req.body.photo , function(err, createdPhoto){
        if (err) {
            console.log(err);
            res.redirect("/photos");
        } else {
            res.redirect("/photos");
        }
    } );
    
    
});

// Show route - show specific photo using id

app.get("/photos/:id", function(req, res) {
    
    Photo.findById(req.params.id, function(err, foundPhoto){
        
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            
            res.render("show", { Photo: foundPhoto });
            
        }
        
    });
    
    
});

// Edit route - edit particular photo
app.get("/photos/:id/edit", function(req, res) {
    
    Photo.findById(req.params.id, function(err, foundPhoto){
        
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("edit", { Photo: foundPhoto });
        }
        
    });
    
    
});

// Update Route - Edit details of particular photo using PUT route
app.put("/photos/:id", function(req, res){
    
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
app.delete("/photos/:id", function(req, res){
    
    Photo.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/photos");
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Photo Diary Server Started...");
});