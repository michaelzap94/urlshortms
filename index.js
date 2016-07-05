var express = require("express");
var app = express();
var url = require("url");
var mongoose = require("mongoose");
var Urlcollection = require("./dbs/urlSchema.js");
var monHand = require("./dbs/mongooseHandler.js");
var dburl = process.env.DATABASEURL || "mongodb://localhost/Urldb";
mongoose.connect(dburl);


app.get("/",function(req,res){
       res.sendFile(__dirname + "/public/main.html");

});

app.get("/new/:url*",function(req,res){
    monHand.destroyPrevious();
    var apiObj;
    var original_url = req.url.split("new/")[1];
    var random = randomNum();

if(urlValidator(original_url)){
        var short_url = fullUrl(req)+"/"+random;

apiObj = {"original_url":original_url, "short_url":short_url};
monHand.addToDb(random,original_url);

res.send(apiObj);
}
else{
    apiObj = {error: "Sorry, wrong URL format."};
    res.send(apiObj);

}
});

//redirect to original
app.get("/:someId",function(req,res){
        var someId= req.params.someId.toString();
        if(someId!=="new"){
                      monHand.findUrl(someId,res);
        }
        else{
    res.send({error: "Sorry, wrong URL format."});

        }
      });
      


//NECESSARY FUNCTIONS-----------------------------------------------


function randomNum() {
    var x = Math.random(); //random number
    x = 9999 * x; //if we want "say" a random number 0-9999
    x = Math.round(x);//////  rounds a number;
    return x;
}

  function urlValidator(url) {
    var regexUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regexUrl.test(url);
  }


function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
}


//----------------------------------------------------------

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});