var express = require("express");
var app = express();
var mongoose = require("mongoose");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");

var Photo = require("./models/photos.js");
var User = require("./models/user.js");
var photosRoutes = require("./routes/photos");
var indexRoutes = require("./routes/index");

var dbURL = process.env.DATABASEURL || "mongodb://localhost:27017/photo_diary";

mongoose.connect(dbURL, { useNewUrlParser: true });

// PASSPORT CONFIG
app.use(require("express-session")({
    
    secret: "Photo Diary",
    resave: false,
    saveUninitialized: false
    
}));

app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public" ));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// For flash and User
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(photosRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Photo Diary Server Started...");
});