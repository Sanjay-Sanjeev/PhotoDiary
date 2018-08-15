var express = require("express");
var app = express();


app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public" ));

// Index Route - Landing Page
app.get("/", function(req, res){
    
    res.render("home");
    
});


// Index Route - show all photos
app.get("/photos", function(req, res){
    res.render("photos");
});

// New Route - show new photo diary form
app.get("/photos/new", function(req, res) {
    res.render("new");
});

// Create Route - crete new photo diary and redirect somewhere



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Photo Diary Server Started...");
});