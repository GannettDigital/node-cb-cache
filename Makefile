.PHONY: test

test:
	COUCHBASE_URL=couchbase://127.0.0.1 COUCHBASE_BUCKET=cache node_modules/.bin/mocha
