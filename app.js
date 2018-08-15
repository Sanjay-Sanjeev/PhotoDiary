var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


mongoose.connect("mongodb://localhost:27017/photo_diary", { useNewUrlParser: true });

var PhotoSchema = mongoose.Schema({
    
    title: String,
    image: String,
    desc: String
    
});

var Photo = mongoose.model( "Photo" , PhotoSchema  );

app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public" ));
app.use(bodyParser.urlencoded({ extended: true}));

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

// Create Route - crete new photo diary and redirect somewhere - POST
app.post("/photos", function(req, res){
    
    res.send("POST ROUTE");
    console.log(req.body);
    
    
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Photo Diary Server Started...");
});