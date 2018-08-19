var express = require("express");
var router = express.Router();

// Index Route - Landing Page
router.get("/", function(req, res){
    
    res.render("home");
    
});

module.exports = router;