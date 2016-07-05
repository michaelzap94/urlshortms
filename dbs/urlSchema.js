var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   randomId: String,
   url:String
  
});

module.exports = mongoose.model("Urlcollection", campgroundSchema);