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
			Expect(result.body.result.description.content).to.be('The official home of the Python Programming Language');
			Expect(result.body.result.description.status).to.be(1);
			Expect(result.body.result.description.message).to.be('It\'s good that you have a meta description, but it should be between 140 and 170 characters. Your\'s is at 52 characters');
			Expect(result.body.result.keywords.content).to.be('Python programming language object oriented web free open source software license documentation download community');
			Expect(result.body.result.keywords.status).to.be(1);
			Expect(result.body.result.keywords.message).to.be('Keywords looks good!');
			done();
		});
	});
});