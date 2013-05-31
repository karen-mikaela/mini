var map = require('../lib/map');

exports.index = function(req, res){
  res.render('index', { title: 'Encurtador de URL' , map: map.getMap()});
};

exports.saveUrl = function(req, res){
  var url = req.body.url;
  var key = map.addUrl(url);
  console.dir(map.getMap());
  res.render('generate',{title: 'Encurtador de URL', url_new: key} );
};

exports.redirect = function(req,res){
    var key = req.params.key;
    var originalUrl = map.getUrl(key);
    console.log("a url é "+originalUrl);
    res.writeHead(302, {
        'Location':  "http://"+originalUrl
    });
    res.end();
};
