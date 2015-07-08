var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	Seo = require('./seo.js'),
	validateVars = require('./utils.js').validateVars;

module.exports = function (app) {
	/*
	 * check URL
	 * @param string url - user input of url
	 * @param function callback
	 */
	var checkURL = function (options, callback) {
		validateVars(options.url, options.keyword, function (validURL, err) {
			if (err) {
				callback(true, err);
			} else {
				options.url = validURL;
				getSEO(options, function (getSEOError, getSEOResults) {
					if (!getSEOError && getSEOResults) {
						callback(null, getSEOResults);
					} else {
						if (getSEOError && (getSEOError.code === 'ENOTFOUND' || getSEOError.code === 'EHOSTUNREACH')) {
							callback(true, 'Page Not Found');
						} else if (getSEOError && getSEOError.code === 'ETIMEDOUT') {
							callback(true, 'Time Out');
						} else {
							callback(true, 'Page Not Found');
						}
					}
				});
			}
		});
	};

	/*
	 * getSEO - scrape that url!
	 * @param string url - the url we want to scrape
	 * @param function callback
	 */
	var getSEO = function (options, callback) {
		request(options, function (err, response, body) {
			if (err) {
				callback(err, null);
			} else {
				var $ = cheerio.load(body),
					ogObject = {};

				async.series({
					checkTitle: function (callback) {
						Seo.checkTitle($('title'), options.keyword, function (checkTitleRes) {
							ogObject.title = checkTitleRes;
							callback();
						});
					},
					checkDescription: function (callback) {
						Seo.checkDescription($('meta'), options.keyword, function (checkDescriptionRes) {
							ogObject.description = checkDescriptionRes;
							callback();
						});
					},
					checkKeywords: function (callback) {
						Seo.checkKeywords($('meta'), function (checkKeywordsRes) {
							ogObject.keywords = checkKeywordsRes;
							callback();
						});
					},
					checkHeaderTags: function (callback) {
						Seo.checkHeaderTags($('h1').first(), $('h2').first(), $('h3').first(), options.keyword, function (checkHeaderTagsRes) {
							ogObject.headerTags = checkHeaderTagsRes;
							callback();
						});
					},
					checkImage: function (callback) {
						Seo.checkImages($('img'), function (checkImagesRes) {
							ogObject.images = checkImagesRes;
							callback();
						});
					}
				},
				function () {
					var urlObj = {};
					urlObj.info = {};
					urlObj.status = 1;
					urlObj.content = options.url;
					if (urlObj.content.length > 90) {
						urlObj.message = 'The URL you enter is over 90 characters';
					}
					urlObj.info.questionMarkOrEqualsInURL = true;
					if (urlObj.content.indexOf('?') === -1 && urlObj.content.indexOf('=') === -1) {
						urlObj.info.questionMarkOrEqualsInURL = false;
					}
					urlObj.info.keywordInURL = false;
					if (urlObj.content.indexOf(options.keyword) > -1) {
						urlObj.info.keywordInURL = true;
					}
					urlObj.info.underscoreInURL = false;
					if (urlObj.content.indexOf('_') > -1) {
						urlObj.info.underscoreInURL = true;
					}
					ogObject.url = urlObj;
					callback(null, ogObject);
				});
			}
		});
	};

	app.post('/getInfo', function (req, res) {
		var options = req.body.options;
		checkURL(options, function (getInfoErr, getInfoRes) {
			if (getInfoErr) {
				return res.status(200).json({'success': false, 'result': getInfoRes});
			} else if (getInfoRes) {
				return res.status(200).json({'success': true, 'result': getInfoRes});
			} else {
				return res.status(200).json({'success': false});
			}
		});
	});
};
