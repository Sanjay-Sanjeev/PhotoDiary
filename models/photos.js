var mongoose = require("mongoose");

var PhotoSchema = mongoose.Schema({
    
    title: String,
    image: String,
    desc: String,
    date: { type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
    
});

module.exports = mongoose.model( "Photo" , PhotoSchema  );