var mapper =  new Object();

exports.addUrl = function(url){
    var key = generateKey();
    var exists = mapper[key];
    if(exists){
        key = generateKey();
    }
    mapper[key] = url;
    return key;
};

exports.getMap = function(){
    return mapper;
};

exports.getUrl = function(key){
    return mapper[key];
};

var generateKey = function () {
    return  Math.floor((Math.random() * 100) + 1);
};