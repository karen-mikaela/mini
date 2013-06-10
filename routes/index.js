var map = require('../lib/map');
var MiniProvider = require('../lib/miniProvider').MiniProvider;
var miniProvider = new MiniProvider('localhost', 27017);
var hostname =  "http://mini.mycode.cc/";

exports.index = function(req, res){  
  miniProvider.findAll( function(error,docs){
    res.render('index', { 
        title: 'MINI - Encurtador de URL',
        map:docs,
        hostname:hostname
    });
  });
};

exports.saveUrl = function(req, res){
  var url = req.body.url;
  var short = map.addUrl(url);
  miniProvider.save( short, function(error,shortSaved){ 
      var urls = [];  
      if(error){
        console.dir(error);
      } else {
        miniProvider.findAll( function(error,docs){
          if(error){
            console.dir(error);

          } else {
              res.render('index', { 
               title: 'MINI - Encurtador de URL',
               url_new: shortSaved.short,
               generated:true,
               hostname:hostname,
               map:docs            
              });
          }
          
        });
      }
  });
};

exports.redirect = function(req,res){
    var key = map.getUrl(req.params.key);
    miniProvider.findById( key, function(error,short){ 
      if(error){
        console.dir(error);
      } else {
        console.log("a url é "+short.url);
        res.writeHead(302, {
            'Location':  short.url
        });
        res.end();
      }
    });    
};
