var request = require('supertest'),
	app = require('../app'),
	supertest = request(app),
	Expect = require('expect.js');

describe('test getInfo:', function (done) {
	it('valid', function (done) {
		var data = {'options':{'url':'https://www.python.org/'}};
		supertest.post('/getInfo').send(data).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.res.description).to.be('The official home of the Python Programming Language');
			done();
		});
	});
});