var request = require('supertest'),
	app = require('../app'),
	supertest = request(app),
	Expect = require('expect.js');

describe('test getInfo:', function () {
	it('Valid URL One', function (done) {
		var data = {'options': {'url': 'https://www.python.org/', 'keyword': 'Python'}};
		supertest.post('/getInfo').send(data).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.result.description.content).to.be('The official home of the Python Programming Language');
			Expect(result.body.result.description.status).to.be(1);
			Expect(result.body.result.description.message).to.be('It\'s good that you have a meta description, but it should be between 140 and 170 characters. Your\'s is at 52 characters');
			Expect(result.body.result.description.info.stringLength).to.be(52);
			Expect(result.body.result.description.info.keywordInDescription).to.be(true);
			Expect(result.body.result.description.info.keywordStartsDescription).to.be(false);
			Expect(result.body.result.keywords.content).to.be('Python programming language object oriented web free open source software license documentation download community');
			Expect(result.body.result.keywords.status).to.be(1);
			Expect(result.body.result.keywords.message).to.be('Keywords looks good!');
			Expect(result.body.result.keywords.info.keywordCount).to.be(14);
			Expect(result.body.result.title.content).to.be('Welcome to Python.org');
			Expect(result.body.result.title.status).to.be(1);
			Expect(result.body.result.title.message).to.be('Title tag looks good!');
			Expect(result.body.result.title.info.stringLength).to.be(21);
			Expect(result.body.result.title.info.keywordInTitle).to.be(true);
			Expect(result.body.result.title.info.keywordStartsTitle).to.be(false);
			Expect(result.body.result.headerTags.h1.status).to.be(0);
			Expect(result.body.result.headerTags.h1.message).to.be('There is no text in the first H1 on your page');
			Expect(result.body.result.headerTags.h2.status).to.be(1);
			Expect(result.body.result.headerTags.h2.content).to.be('Get Started');
			Expect(result.body.result.headerTags.h2.info.keywordInHeader).to.be(false);
			Expect(result.body.result.headerTags.h2.info.keywordStartsHeader).to.be(false);
			Expect(result.body.result.headerTags.h3.status).to.be(0);
			Expect(result.body.result.headerTags.h3.message).to.be('There is no text in the first H3 on your page');
			Expect(result.body.result.headerTags.info.doHeadersExist).to.be(false);
			Expect(result.body.result.headerTags.info.headerDuplicate).to.be(false);
			Expect(result.body.result.images.message).to.be(undefined);
			Expect(result.body.result.images.status).to.be(1);
			Expect(result.body.result.images.info.imageCount).to.be(1);
			Expect(result.body.result.images.info.URLArray[0]).to.be('/static/img/python-logo.png');
			Expect(result.body.result.images.info.missingAlt).to.be.empty();
			Expect(result.body.result.images.info.imageNames[0]).to.be('python-logo.png');
			Expect(result.body.result.images.info.underscoreInImageName).to.be.empty();
			Expect(result.body.result.images.info.keywordInImageName).to.be(true);
			Expect(result.body.result.url.content).to.be('https://www.python.org/');
			Expect(result.body.result.url.message).to.be(undefined);
			Expect(result.body.result.url.status).to.be(1);
			Expect(result.body.result.url.info.questionMarkOrEqualsInURL).to.be(false);
			Expect(result.body.result.url.info.keywordInURL).to.be(true);
			Expect(result.body.result.url.info.underscoreInURL).to.be(false);
			Expect(result.body.result.links.info.linkCount).to.be(192);
			Expect(result.body.result.links.info.noFollowCount).to.be(0);
			Expect(result.body.result.links.info.externalCount).to.be(60);
			done();
		});
	});
	it('Valid URL Two', function (done) {
		var data = {'options': {'url': 'https://www.mozilla.org/en-US/firefox/new/', 'keyword': 'browser'}};
		supertest.post('/getInfo').send(data).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.result.description.content).to.be('Download Mozilla Firefox, a free Web browser. Firefox is created by a global non-profit dedicated to putting individuals in control online. Get Firefox today!');
			Expect(result.body.result.description.status).to.be(1);
			Expect(result.body.result.description.message).to.be('It\'s good that you have a meta description, but it should be between 140 and 170 characters. Your\'s is at 158 characters');
			Expect(result.body.result.description.info.stringLength).to.be(158);
			Expect(result.body.result.description.info.keywordInDescription).to.be(true);
			Expect(result.body.result.description.info.keywordStartsDescription).to.be(false);
			Expect(result.body.result.keywords.status).to.be(0);
			Expect(result.body.result.keywords.message).to.be('Your site needs a meta keywords.');
			Expect(result.body.result.title.content).to.be('Download Firefox — Free Web Browser — Mozilla');
			Expect(result.body.result.title.status).to.be(1);
			Expect(result.body.result.title.message).to.be('Title tag looks good!');
			Expect(result.body.result.title.info.stringLength).to.be(45);
			Expect(result.body.result.title.info.keywordInTitle).to.be(true);
			Expect(result.body.result.title.info.keywordStartsTitle).to.be(false);
			Expect(result.body.result.headerTags.h1.status).to.be(1);
			Expect(result.body.result.headerTags.h1.content).to.be('When it’s personal,choose Firefox.');
			Expect(result.body.result.headerTags.h1.info.keywordInHeader).to.be(false);
			Expect(result.body.result.headerTags.h1.info.keywordStartsHeader).to.be(false);
			Expect(result.body.result.headerTags.h2.status).to.be(0);
			Expect(result.body.result.headerTags.h2.message).to.be('There is no text in the first H2 on your page');
			Expect(result.body.result.headerTags.h3.status).to.be(1);
			Expect(result.body.result.headerTags.h3.content).to.be('Get Firefox news');
			Expect(result.body.result.headerTags.h3.info.keywordInHeader).to.be(false);
			Expect(result.body.result.headerTags.h3.info.keywordStartsHeader).to.be(false);
			Expect(result.body.result.headerTags.info.doHeadersExist).to.be(false);
			Expect(result.body.result.headerTags.info.headerDuplicate).to.be(false);
			Expect(result.body.result.images.message).to.be(undefined);
			Expect(result.body.result.images.status).to.be(1);
			Expect(result.body.result.images.info.imageCount).to.be(3);
			Expect(result.body.result.images.info.URLArray[0]).to.be('//mozorg.cdn.mozilla.net/media/img/firefox/new/header-firefox.98d0a02c957f.png');
			Expect(result.body.result.images.info.URLArray[1]).to.be('//mozorg.cdn.mozilla.net/media/img/firefox/new/firefox-logo.d3cb43a0a16f.png');
			Expect(result.body.result.images.info.URLArray[2]).to.be('//mozorg.cdn.mozilla.net/media/img/firefox/new/browser-windows.b9cf0baa80e1.png');
			Expect(result.body.result.images.info.missingAlt).to.be.empty();
			Expect(result.body.result.images.info.imageNames[0]).to.be('header-firefox.98d0a02c957f.png');
			Expect(result.body.result.images.info.imageNames[1]).to.be('firefox-logo.d3cb43a0a16f.png');
			Expect(result.body.result.images.info.imageNames[2]).to.be('browser-windows.b9cf0baa80e1.png');
			Expect(result.body.result.images.info.underscoreInImageName).to.be.empty();
			Expect(result.body.result.images.info.keywordInImageName).to.be(true);
			Expect(result.body.result.url.content).to.be('https://www.mozilla.org/en-US/firefox/new/');
			Expect(result.body.result.url.message).to.be(undefined);
			Expect(result.body.result.url.status).to.be(1);
			Expect(result.body.result.url.info.questionMarkOrEqualsInURL).to.be(false);
			Expect(result.body.result.url.info.keywordInURL).to.be(false);
			Expect(result.body.result.url.info.underscoreInURL).to.be(false);
			Expect(result.body.result.links.info.linkCount).to.be(56);
			Expect(result.body.result.links.info.noFollowCount).to.be(0);
			Expect(result.body.result.links.info.externalCount).to.be(30);
			done();
		});
	});
	it('Valid URL Three', function (done) {
		var data = {'options': {'url': 'https://en.wikipedia.org/wiki/Search_engine_optimization', 'keyword': 'seo'}};
		supertest.post('/getInfo').send(data).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.result.description.content).to.be(null);
			Expect(result.body.result.description.status).to.be(0);
			Expect(result.body.result.description.message).to.be('Your site needs a meta description.');
			Expect(result.body.result.keywords.status).to.be(0);
			Expect(result.body.result.keywords.message).to.be('Your site needs a meta keywords.');
			Expect(result.body.result.title.content).to.be('Search engine optimization - Wikipedia, the free encyclopedia');
			Expect(result.body.result.title.status).to.be(1);
			Expect(result.body.result.title.message).to.be('Title tag looks good!');
			Expect(result.body.result.title.info.stringLength).to.be(61);
			Expect(result.body.result.title.info.keywordInTitle).to.be(false);
			Expect(result.body.result.title.info.keywordStartsTitle).to.be(false);
			Expect(result.body.result.headerTags.h1.status).to.be(1);
			Expect(result.body.result.headerTags.h1.content).to.be('Search engine optimization');
			Expect(result.body.result.headerTags.h1.info.keywordInHeader).to.be(false);
			Expect(result.body.result.headerTags.h1.info.keywordStartsHeader).to.be(false);
			Expect(result.body.result.headerTags.h2.status).to.be(1);
			Expect(result.body.result.headerTags.h2.content).to.be('Contents');
			Expect(result.body.result.headerTags.h3.status).to.be(1);
			Expect(result.body.result.headerTags.h3.content).to.be('Relationship with Google');
			Expect(result.body.result.headerTags.h3.info.keywordInHeader).to.be(false);
			Expect(result.body.result.headerTags.h3.info.keywordStartsHeader).to.be(false);
			Expect(result.body.result.headerTags.info.doHeadersExist).to.be(true);
			Expect(result.body.result.headerTags.info.headerDuplicate).to.be(false);
			Expect(result.body.result.images.message).to.be(undefined);
			Expect(result.body.result.images.status).to.be(1);
			Expect(result.body.result.images.info.imageCount).to.be(8);
			Expect(result.body.result.images.info.URLArray[0]).to.be('//upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Padlock-silver.svg/20px-Padlock-silver.svg.png');
			Expect(result.body.result.images.info.URLArray[1]).to.be('//upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sound-icon.svg/20px-Sound-icon.svg.png');
			Expect(result.body.result.images.info.URLArray[2]).to.be('//upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Merge-arrow.svg/50px-Merge-arrow.svg.png');
			Expect(result.body.result.images.info.missingAlt[0]).to.be('50px-Merge-arrow.svg.png');
			Expect(result.body.result.images.info.imageNames[0]).to.be('20px-Padlock-silver.svg.png');
			Expect(result.body.result.images.info.imageNames[1]).to.be('20px-Sound-icon.svg.png');
			Expect(result.body.result.images.info.imageNames[2]).to.be('50px-Merge-arrow.svg.png');
			Expect(result.body.result.images.info.underscoreInImageName[0]).to.be('350px-Websites_interlinking_to_illustrate_PageRank_percents.png');
			Expect(result.body.result.images.info.keywordInImageName).to.be(false);
			Expect(result.body.result.url.content).to.be('https://en.wikipedia.org/wiki/Search_engine_optimization');
			Expect(result.body.result.url.message).to.be(undefined);
			Expect(result.body.result.url.status).to.be(1);
			Expect(result.body.result.url.info.questionMarkOrEqualsInURL).to.be(false);
			Expect(result.body.result.url.info.keywordInURL).to.be(false);
			Expect(result.body.result.url.info.underscoreInURL).to.be(true);
			Expect(result.body.result.links.info.linkCount).to.be(549);
			Expect(result.body.result.links.info.noFollowCount).to.be(70);
			Expect(result.body.result.links.info.externalCount).to.be(73);
			done();
		});
	});
	it('Valid URL Four', function (done) {
		var data = {'options': {'url': 'http://www.johnnywalters.com/tests/howdy-partner.html', 'keyword': 'Partner'}};
		supertest.post('/getInfo').send(data).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(true);
			Expect(result.body.result.description.content).to.be('Howdy Partner! howdyparter.com is the internet\'s BEST website ever. It talks about all sorts of stuff like how to say hi, howdy.');
			Expect(result.body.result.description.status).to.be(1);
			Expect(result.body.result.description.message).to.be('It\'s good that you have a meta description, but it should be between 140 and 170 characters. Your\'s is at 128 characters');
			Expect(result.body.result.description.info.stringLength).to.be(128);
			Expect(result.body.result.description.info.keywordInDescription).to.be(true);
			Expect(result.body.result.description.info.keywordStartsDescription).to.be(false);
			Expect(result.body.result.keywords.status).to.be(0);
			Expect(result.body.result.keywords.message).to.be('Your site needs a meta keywords.');
			Expect(result.body.result.title.content).to.be('Howdy Partner Interactive Website');
			Expect(result.body.result.title.status).to.be(1);
			Expect(result.body.result.title.message).to.be('Title tag looks good!');
			Expect(result.body.result.title.info.stringLength).to.be(33);
			Expect(result.body.result.title.info.keywordInTitle).to.be(true);
			Expect(result.body.result.title.info.keywordStartsTitle).to.be(false);
			Expect(result.body.result.headerTags.h1.status).to.be(1);
			Expect(result.body.result.headerTags.h1.content).to.be('Howdy Partner Website');
			Expect(result.body.result.headerTags.h1.info.keywordInHeader).to.be(true);
			Expect(result.body.result.headerTags.h1.info.keywordStartsHeader).to.be(false);
			Expect(result.body.result.headerTags.h2.status).to.be(1);
			Expect(result.body.result.headerTags.h2.content).to.be('We like to say');
			Expect(result.body.result.headerTags.h3.status).to.be(1);
			Expect(result.body.result.headerTags.h3.content).to.be('Simple');
			Expect(result.body.result.headerTags.h3.info.keywordInHeader).to.be(false);
			Expect(result.body.result.headerTags.h3.info.keywordStartsHeader).to.be(false);
			Expect(result.body.result.headerTags.info.doHeadersExist).to.be(true);
			Expect(result.body.result.headerTags.info.headerDuplicate).to.be(false);
			Expect(result.body.result.images.message).to.be(undefined);
			Expect(result.body.result.images.status).to.be(1);
			Expect(result.body.result.images.info.imageCount).to.be(3);
			Expect(result.body.result.images.info.URLArray[0]).to.be('simple-howdy-partner.jpg');
			Expect(result.body.result.images.info.URLArray[1]).to.be('howdy-partner.jpg');
			Expect(result.body.result.images.info.URLArray[2]).to.be('simple-howdy-parter.jpg');
			Expect(result.body.result.images.info.missingAlt).to.be.empty();
			Expect(result.body.result.images.info.imageNames[0]).to.be('simple-howdy-partner.jpg');
			Expect(result.body.result.images.info.imageNames[1]).to.be('howdy-partner.jpg');
			Expect(result.body.result.images.info.imageNames[2]).to.be('simple-howdy-parter.jpg');
			Expect(result.body.result.images.info.underscoreInImageName).to.be.empty();
			Expect(result.body.result.images.info.keywordInImageName).to.be(true);
			Expect(result.body.result.url.content).to.be('http://www.johnnywalters.com/tests/howdy-partner.html');
			Expect(result.body.result.url.message).to.be(undefined);
			Expect(result.body.result.url.status).to.be(1);
			Expect(result.body.result.url.info.questionMarkOrEqualsInURL).to.be(false);
			Expect(result.body.result.url.info.keywordInURL).to.be(true);
			Expect(result.body.result.url.info.underscoreInURL).to.be(false);
			Expect(result.body.result.links.info.linkCount).to.be(11);
			Expect(result.body.result.links.info.noFollowCount).to.be(1);
			Expect(result.body.result.links.info.externalCount).to.be(4);
			done();
		});
	});
	it('Invalid - No URL', function (done) {
		var data = {'options': {'url': '', 'keyword': 'Python'}};
		supertest.post('/getInfo').send(data).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.result).to.be('No URL');
			done();
		});
	});
	it('Invalid - No Keyword', function (done) {
		var data = {'options': {'url': 'https://www.python.org/', 'keyword': ''}};
		supertest.post('/getInfo').send(data).end(function (err, result) {
			Expect(result.res.statusCode).to.be(200);
			Expect(result.body.success).to.be(false);
			Expect(result.body.result).to.be('No Keyword');
			done();
		});
	});
});
