/*
 * validate var
 * @param string var - user input
 * @param function callback
 */
exports.validateVars = function(inputUrl, inputTimeout, callback) {
	/*
	 * validate url - all urls must have http:// in front of them
	 * @param string var - the url we want to scrape
	 * @param function callback
	 */
	var validateUrl = function(inputUrl) {
		if(!/^(f|ht)tps?:\/\//i.test(inputUrl)) {
			inputUrl = "http://" + inputUrl;
		};
		return inputUrl;
	};

	/*
	 * validate timeout - how long should we wait for a request
	 * @param number var - the time we want to wait
	 * @param function callback
	 */
	var validateTimeout = function(inputTimeout) {
		if(!/^\d{1,10}$/.test(inputTimeout)) {
			return false;
		};
		return true;
	};

	var returnInputUrl,returnInputUrlFlag,returnInputTimeout,returnInputTimeoutFlag;
	if ( inputUrl == null || inputUrl.length < 1 || typeof inputUrl === 'undefined' || !inputUrl) {
		returnInputUrlFlag = false;
		returnInputUrl = '';
	} else {
		returnInputUrlFlag = true;
		returnInputUrl = validateUrl(inputUrl);
	};
	if ( inputTimeout == null || inputTimeout.length < 1 || typeof inputTimeout === 'undefined' || !inputTimeout) {
		returnInputTimeoutFlag = true;
		returnInputTimeout = 2000; //time default to 2000ms
	} else {
		if(validateTimeout(inputTimeout)) {
			returnInputTimeoutFlag = true;
			returnInputTimeout = inputTimeout;
		} else {
			returnInputTimeoutFlag = true;
			returnInputTimeout = 2000; //time default to 2000ms
		}
	};
	callback(returnInputUrlFlag, returnInputUrl, returnInputTimeoutFlag, returnInputTimeout)
};