var assert = require('assert');
var couchbase = require('couchbase');
var CBCache = require('../cb-cache');
var cluster = new couchbase.Cluster(process.env.COUCHBASE_URL);
var bucket = cluster.openBucket(process.env.COUCHBASE_BUCKET);
var cache = new CBCache(bucket);
var Q = require('Q');
var cb_set = Q.nbind(cache.set, cache)
var cb_get = Q.nbind(cache.get, cache)
var cb_del = Q.nbind(cache.del, cache)

describe('CBCache', function(){
  describe('#set() / #del()', function() {


    it('should delete an existing key', function(done) {

      cb_set('foo', 'bar', 10).then(
	function() { return cb_del('foo'); }
      ).then(
	function() { return cb_get('foo') }
      ).then(
	function(value) {
	  assert.equal(value, undefined);
	  done();
	}
      ).done();

    });


    it('should not error with a non-existing key', function(done) {
      cb_del('foo').then(
	function() { return cb_del('foo') }
      ).then(done).done()
    });

  });

  describe('#set() / #get()', function(){


    it('should return value within timeout', function(done){

      cb_set('foo', 'bar', 10).then(
	function() {
	  return cb_get('foo')
	}
      ).then(
	function(value) {
	  assert.equal(value, 'bar');
	  done();
	}
      ).done();
    })


    it('should return undefined outside timeout', function(done){
      cb_set('foo', 'bar', 1).then(
	function() { return Q.delay(1500); }
      ).then(
	function() { return cb_get('foo'); }
      ).then(
	function(value) {
	  assert.equal(value, undefined);
	  done();
	}
      ).done();
    })
  })
})


