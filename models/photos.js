var mongoose = require("mongoose");

var PhotoSchema = mongoose.Schema({
    
    title: String,
    image: String,
    desc: String,
    date: { type: Date, default: Date.now}
    
});

module.exports = mongoose.model( "Photo" , PhotoSchema  );