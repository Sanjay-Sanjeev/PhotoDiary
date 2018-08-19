var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    
    name: String,
    password: String
    
});

module.exports = mongoose.model("User", UserSchema);