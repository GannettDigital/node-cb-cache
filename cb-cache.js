'use strict';
var couchbase = require('couchbase');

module.exports = CBCache;


function CBCache(bucket) {
  this._bucket = bucket;
}


CBCache.prototype.get = function(key, callback) {
  this._bucket.get(key, function(err, obj) {
    filter_keyNotFound(err, obj, function(err, obj) {
      var value = !!obj ? obj.value : undefined;
      callback(err, value);
    })
  })
}


CBCache.prototype.set = function(key, value, lifetime, callback) {
  this._bucket.upsert(
    key,
    value,
    {'expiry': lifetime},
    callback
  )
}


CBCache.prototype.del = function(key, callback) {
  this._bucket.remove(key, {}, function(err) {
    filter_keyNotFound(err, undefined, callback);
  });
}

/*******************************************************************************
** Internal
*******************************************************************************/

// This function filters the keyNotFound errors and results in undefined
// This mimics the memcached behavior
function filter_keyNotFound(err, result, callback) {
  if(!!err && err.code && err.code == couchbase.errors.keyNotFound) {
    callback(undefined, undefined);
  } else {
    callback(err, result)
  }
}
