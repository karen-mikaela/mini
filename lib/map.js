var mapper =  new Object();
var Url = require('url');
var alphabet, base;

var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
var base = alphabet.length;


exports.addUrl = function(url){
    var parsed = Url.parse(url);
    var correct_url = parsed.protocol === undefined ? 'http://' + url: url;

    var id = parseInt(new Date().getTime()/1000);     
    var exists = mapper[id];
    if(exists){
        id = parseInt(new Date().getTime()/1000);
    }    
    var short = encode(id);
    var object_url = new Object();
    object_url.short = short;
    object_url.url = correct_url;    
    mapper[id] = object_url;
    
    return short;
};

exports.getMap = function(){
    return mapper;
};

exports.getUrl = function(key){
    var id = decode(key);
    var url = mapper[id];
    return url.url;
};

function encode(i) {
  var s;
  if (i === 0) {
    return alphabet[0];
  }
  s = "";
  while (i > 0) {
    s += alphabet[i % base];
    i = parseInt(i / base, 10);
  }
  return s.split("").reverse().join("");
};

function decode(s) {
  var c, i, _i, _len;
  i = 0;
  for (_i = 0, _len = s.length; _i < _len; _i++) {
    c = s[_i];
    i = i * base + alphabet.indexOf(c);
  }
  return i;
};