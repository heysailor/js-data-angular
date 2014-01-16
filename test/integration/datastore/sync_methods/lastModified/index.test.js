describe('DS.lastModified(resourceName[, id])', function () {
	var errorPrefix = 'DS.lastModified(resourceName[, id]): ';

	it('should throw an error when method pre-conditions are not met', function (done) {
		assert.throws(function () {
			DS.lastModified('does not exist', {});
		}, DS.errors.RuntimeError, errorPrefix + 'does not exist is not a registered resource!');

		angular.forEach(TYPES_EXCEPT_STRING_OR_NUMBER, function (key) {
			if (key) {
				assert.throws(function () {
					DS.lastModified('post', key);
				}, DS.errors.IllegalArgumentError, errorPrefix + 'id: Must be a string or a number!');
			}
		});

		done();
	});
	it('should lastModified an item into the store', function (done) {

		var collectionLastModified;

		assert.equal(DS.lastModified('post', 5), 0);
		assert.equal(DS.lastModified('post'), 0);

		collectionLastModified = DS.lastModified('post');

		assert.doesNotThrow(function () {
			DS.inject('post', p1);
		});

		assert.notEqual(DS.lastModified('post'), collectionLastModified);
		collectionLastModified = DS.lastModified('post');
		assert.notEqual(DS.lastModified('post', 5), 0);
		var lastModified = DS.lastModified('post', 5);
		assert.isNumber(lastModified);

		assert.doesNotThrow(function () {
			DS.inject('post', p2);
		});

		assert.notEqual(DS.lastModified('post'), collectionLastModified);

		collectionLastModified = DS.lastModified('post');
		assert.equal(DS.lastModified('post', 5), lastModified);

		assert.doesNotThrow(function () {
			DS.inject('post', p3);
		});

		assert.notEqual(DS.lastModified('post'), collectionLastModified);

		collectionLastModified = DS.lastModified('post');
		assert.equal(DS.lastModified('post', 5), lastModified);

		done();
	});
//	it('should lastModified an item into the store', function (done) {
//
//		assert.equal(DS.lastModified('post', 5), 0);
//		assert.doesNotThrow(function () {
//			assert.deepEqual(DS.lastModified('post', p1), p1);
//		});
//		assert.notEqual(DS.lastModified('post', 5), 0);
//		assert.isNumber(DS.lastModified('post', 5));
//
//		var post = DS.get('post', 5);
//
//		post.id = 10;
//
//		DS.digest();
//
//		assert.deepEqual('Doh! You just changed the primary key of an object! ' +
//			'I don\'t know how to handle this yet, so your data for the "post' +
//			'" resource is now in an undefined (probably broken) state.', $log.error.logs[0][0]);
//
//		done();
//	});
});
