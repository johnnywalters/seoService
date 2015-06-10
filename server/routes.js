var request = require('request'),
	cheerio = require('cheerio'),
	_ = require('lodash');

module.exports = function(app) {
	var validateVars = require('./utils.js').validateVars;

	/*
	 * get info
	 * @param string url - user input of url
	 * @param function callback
	 */
	var getInfo = function(options, callback) {
		var error = null, returnResule = {};
		that = this;
		validateVars(options.url, options.timeout, function(inputUrlFlag, inputUrl, inputTimeoutFlag, inputTimeout) {
			if(inputUrlFlag && inputUrlFlag == true && inputTimeoutFlag && inputTimeoutFlag == true){
				options.url = inputUrl;
				options.timeout = inputTimeout;
				getSEO(options, function(err, results) {
					if(results && results.success){
						returnResule = {
							data: results,
							success: true
						};
					}else{
						if(err && (err.code == 'ENOTFOUND' || err.code == 'EHOSTUNREACH')){
							error = 'err';
							returnResule = {
								err: 'Page Not Found',
								success: false
							};
						} else if(err && err.code == 'ETIMEDOUT'){
							error = 'err';
							returnResule = {
								err: 'Time Out',
								success: false
							};
						}else{
							error = 'err';
							returnResule = {
								err: 'Page Not Found',
								success: false
							};
						}
					};
					callback(error,returnResule);
				});
			}else{
				callback('err',{
					success: false,
					err: 'Invalid URL'
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

				//able to get og info
				ogObject.success = 'true';

				var meta = $('meta'),
					keys = Object.keys(meta),
					description;

				keys.forEach(function(key) {
					if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'description') {
						description = meta[key].attribs.content;
					}
				});

				console.log('description:', description);

				console.log('ogObject',ogObject);
				callback(null,ogObject);
			};
		});
	};

	app.post('/getInfo', function(req, res) {
		var options = req.body.options;
		console.log('options: ', options);
		getInfo(options, function(getInfoErr, getInfoRes) {
			console.log('res:', getInfoRes);
			return res.json({
				success: true,
			});
		});
	});
}