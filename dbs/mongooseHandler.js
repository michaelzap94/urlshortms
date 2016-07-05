var Urlcollection = require("./urlSchema.js");
var url = require("url");

function addToDb(rId,original_url){ 
    
    var obj = { randomId: rId,
   url:original_url};
    
    Urlcollection.create(obj, function(err, datRet){
                if(err){
                    console.log(err)
                } else {
                                     console.log(datRet);

                }
  });}
  
  function findUrl(rId,res){ 
    
    var obj = { randomId: rId};
    
    Urlcollection.findOne(obj, function(err, datRet){
                if(err){
                    console.log(err);
    res.send({error: "Sorry, wrong URL format."});

                } else {
                    console.log(datRet);
                    if(datRet){
                    res.redirect(datRet.url);
                    }
                    else{
    res.send({error: "Sorry, wrong URL format."});

                    }
                }
  });}

function destroyPrevious(){
    Urlcollection.remove({}, function(err){
    
    if(err){
        console.log(err);
    }
   
    console.log("removed data");
    
});
}
var obj = {
    destroyPrevious : destroyPrevious,
    findUrl: findUrl,
    addToDb: addToDb
}

module.exports = obj;