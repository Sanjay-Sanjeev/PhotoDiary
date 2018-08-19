var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var Photo = require("./models/photos.js");
var photosRoutes = require("./routes/photos");
var indexRoutes = require("./routes/index");

var dbURL = process.env.DATABASEURL || "mongodb://localhost:27017/photo_diary";

mongoose.connect(dbURL, { useNewUrlParser: true });

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public" ));
app.use(bodyParser.urlencoded({ extended: true}));


app.use(indexRoutes);
app.use(photosRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Photo Diary Server Started...");
});