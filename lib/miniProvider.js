var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

MiniProvider = function(host, port) {
  this.db= new Db('mini', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

MiniProvider.prototype.getCollection= function(callback) {
  this.db.collection('short', function(error, short_collection) {
    if( error ){
    	console.dir(error);
    	callback(error);	
    }else {
    	callback(null, short_collection);
    }
  });
};

MiniProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, short_collection) {
      if( error ) {
      	console.dir(error);
      	callback(error);
      } else {
        short_collection.find().sort({_id:-1}).limit(10).toArray(function(error, results) {
          if( error ) {
          	console.dir(error);
          	callback(error);
          } else {
          	callback(null, results);
          }
        });
      }
    });
};

MiniProvider.prototype.save = function(short, callback) {
    this.getCollection(function(error, short_collection) {
      if( error ) {
      	console.dir(error);
      	callback(error);
      } else {
          short_collection.insert(short, function() {
          callback(null, short);
        });
     }
    });
};

MiniProvider.prototype.findById = function(key, callback) {
    this.getCollection(function(error, short_collection) {
      if( error ) {
      	console.dir(error);
      	callback(error);      	
      } else {
        short_collection.findOne({'key': key}, function(error, result) {
          if( error ) {
          	console.dir(error);
          	callback(error);
          } else {
          	callback(null, result);
          }
        });
      }
    });
};

exports.MiniProvider = MiniProvider;
