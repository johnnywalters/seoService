var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	Seo = require('./seo.js'),
	_ = require('lodash'),
	validateVars = require('./utils.js').validateVars;

module.exports = function(app) {
	/*
	 * check URL
	 * @param string url - user input of url
	 * @param function callback
	 */
	var checkURL = function(options, callback) {
		var error = null, returnResule = {};
		that = this;
		validateVars(options.url, options.keyword, function(validURL, err) {
			if (err) {
				callback(true, err);
			} else {
				options.url = validURL;
				getSEO(options, function(getSEOError, getSEOResults) {
					if (!getSEOError && getSEOResults) {
						callback(null, getSEOResults);
					} else {
						if (getSEOError && (getSEOError.code == 'ENOTFOUND' || getSEOError.code == 'EHOSTUNREACH')) {
							callback(true, 'Page Not Found');
						} else if (getSEOError && getSEOError.code == 'ETIMEDOUT') {
							callback(true, 'Time Out');
						} else {
							callback(true, 'Page Not Found');
						}
					};
				});
			};
		});
	};

	/*
	 * getSEO - scrape that url!
	 * @param string url - the url we want to scrape
	 * @param function callback
	 */
	var getSEO = function(options, callback) {
		request(options, function(err, response, body) {
			if(err){
				callback(err, null);
			} else {
				var $ = cheerio.load(body),
					meta = $('meta'),
					keys = Object.keys(meta),
					ogObject = {};

				async.series({
					checkDescription: function (callback) {
						Seo.checkDescription(meta, keys, function (checkDescriptionRes) {
							ogObject.description = checkDescriptionRes;
							callback();
						});
					},
					checkKeywords: function (callback) {
						Seo.checkKeywords(meta, keys, function (checkKeywordsRes) {
							ogObject.keywords = checkKeywordsRes;
							callback();
						});
					}
				},
				function () {
					callback(null, ogObject);
				});
			};
		});
	};

	app.post('/getInfo', function(req, res) {
		var options = req.body.options;
		checkURL(options, function(getInfoErr, getInfoRes) {
			if (getInfoErr) {
				return res.status(200).json({'success': false, 'result': getInfoRes});
			} else if (getInfoRes) {
				return res.status(200).json({'success': true, 'result': getInfoRes});
			} else {
				return res.status(200).json({'success': false});
			}
		});
	});
}