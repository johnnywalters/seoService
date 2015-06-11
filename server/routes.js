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
		validateVars(options.url, options.timeout, function(inputUrlFlag, inputUrl, inputTimeoutFlag, inputTimeout) {
			if (inputUrlFlag && inputUrlFlag == true && inputTimeoutFlag && inputTimeoutFlag == true) {
				options.url = inputUrl;
				options.timeout = inputTimeout;
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
			} else {
				callback(true, 'Invalid URL');
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