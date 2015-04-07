# cb-cache
A simple memcached like interface to [couchbase](https://www.npmjs.com/package/couchbase)

## Usage

```js
var couchbase = require('couchbase');
var CBCache = require('cb-cache');
var cluster = new couchbase.Cluster("couchbase://127.0.0.1");
var bucket = cluster.openBucket("cache");
var cache = new CBCache(bucket);

cache.get('foo', function (err, data) {
  console.log(data);
});	
```

## API

**CBCache.get** Get the value for the given key.

* `key`: **String**, the key
* `callback`: **Function**, the callback.

```js
cache.get('foo', function (err, data) {
  console.log(data);
});
```


**cache.set** Stores a new value in Cache.

* `key`: **String** the name of the key
* `value`: **Mixed** Either a buffer, JSON, number or string that you want to store.
* `lifetime`: **Number**, how long the data needs to be stored measured in `seconds`
* `callback`: **Function** the callback

```js
cache.set('foo', 'bar', 10, function (err) { /* stuff */ });
```

**memcached.del** Remove the key from memcached.

* `key`: **String** the name of the key
* `callback`: **Function** the callback

```js
memcached.del('foo', function (err) { /* stuff */ });
```
