var map = require('../lib/map');
var MiniProvider = require('../lib/miniProvider').MiniProvider;
var miniProvider = new MiniProvider('localhost', 27017);
//var hostname =  "http://localhost:3000/";
var hostname =  "http://mini.mycode.cc/";

exports.index = function(req, res){  
   miniProvider.findAll( function(error,docs){
    res.render('index', { 
        title: 'MINI',
        map:docs,
        hostname:hostname
    });
  });
};

exports.saveUrl = function(req, res){
  var url = req.body.url;
  var _short = map.addUrl(url);

  miniProvider.findByUrl(_short.url, function(error, items){
    console.log("findByUrl "+_short.url);
    console.log(items.length);
    if(error) {
      console.dir(error);
    } else {
      if(items.length == 0) {
        console.log("salvar "+_short.url);
        //save 
        miniProvider.save(_short, function(error, shortSaved) {
            var urls = [];
            if(error){
              console.dir(error);
            } else {
              console.log("salvo "+shortSaved.short);
              miniProvider.findAll( function(error,docs){
                if(error){
                  console.dir(error);
                } else {
                    res.render('index', { 
                     title: 'MINI',
                     url_new: shortSaved.short,
                     generated:true,
                     hostname:hostname,
                     map:docs
                    });
                }
                
              });
            }
        });
      } else {
        //return
        console.log("retona  "+items[0].url);
        miniProvider.findAll( function(error,docs){
                if(error){
                  console.dir(error);
                } else {
                    res.render('index', { 
                     title: 'MINI',
                     url_new: items[0].short,
                     generated:true,
                     hostname:hostname,
                     map:docs
                    });
                }
                
        });
      }
    }
  });
};

exports.redirect = function(req,res){
    var key = map.getUrl(req.params.key);
    miniProvider.findById( key, function(error,short){
      if(error){
        console.dir(error);        
      } else {
        if(short == null){
          console.log("ERRO 404");
          res.render('404', { 
               title: 'MINI',
               hostname:hostname
          });
        } else {
          console.log("a url é "+short.url);
          res.writeHead(302, {
            'Location':  short.url
          });
          res.end();  
        }        
      }
    });    
};
