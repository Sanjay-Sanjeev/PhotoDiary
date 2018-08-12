var express = require("express");
var app = express();


app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public" ));


app.get("/", function(req, res){
    
    res.render("home");
    
});

app.get("/photos", function(req, res){
    res.render("photos");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Photo Diary Server Started...");
});