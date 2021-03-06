/*
 * extract domain
 * @param string url - user input url
 * @param function callback
 */
exports.extractDomain = function (url, callback) {
	var domain;
	if (url.indexOf('://') > -1) {
		domain = url.split('/')[2];
	} else {
		domain = url.split('/')[0];
	}
	domain = domain.split(':')[0];
	callback(domain);
};

/*
 * validate var
 * @param string var - user input
 * @param function callback
 */
exports.validateVars = function (inputUrl, inputKeyword, callback) {
	/*
	 * validate url - all urls must have http:// in front of them
	 * @param string var - the url we want to scrape
	 * @param function callback
	 */
	var validateUrl = function (inputUrl) {
		if (validateVar(inputUrl)) {
			if (!/^(f|ht)tps?:\/\//i.test(inputUrl)) {
				inputUrl = 'http://' + inputUrl;
			}
			return inputUrl;
		} else {
			return 'No URL';
		}
	};

	/*
	 * validate keyword - this is the SEO keyword we are testing against
	 * @param string var - the seo keyword
	 * @param function callback
	 */
	var validateKeyword = function (inputKeyword) {
		if (validateVar(inputKeyword)) {
			var regex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
			if (regex.test(inputKeyword)) {
				return;
			} else {
				return 'Invalid Keyword';
			}
		} else {
			return 'No Keyword';
		}
	};

	/*
	 * validate var
	 * @param string var - user input
	 */
	var validateVar = function (inputVar) {
		if (inputVar === null || (inputVar && inputVar.length < 1) || typeof inputVar === 'undefined' || !inputVar) {
			return false;
		} else {
			return true;
		}
	};

	var returnInputUrl,
		returnError = null;

	returnInputUrl = validateUrl(inputUrl);
	if (returnInputUrl === 'No URL') {
		returnError = 'No URL';
	}

	if (validateKeyword(inputKeyword) === 'Invalid Keyword' || validateKeyword(inputKeyword) === 'No Keyword') {
		returnError = validateKeyword(inputKeyword);
	}

	callback(returnInputUrl, returnError);
};
