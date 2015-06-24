module.exports = {
	/*---------------------------------------------------------------------
	|	checkTitle
	|
	|	Purpose: checking the title
	|
	|	Parameters: title
	|
	|	Returns: titleObj
	|
	|	TODO: Add more tests
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkTitle: function (title, keyword, callback) {
		var titleObj = {};
		if (title.text() === null) {
			titleObj.status = 0;
			titleObj.message = 'You need to add a title tag.';
		} else {
			titleObj.content = title.text();
			titleObj.status = 1;
			titleObj.message = 'Title tag looks good!';
			titleObj.info = {};
			titleObj.info.stringLength = title.text().length;
			titleObj.info.keywordInTitle = false;
			titleObj.info.keywordStartsTitle = false;
			if (titleObj.content.indexOf(keyword) > -1) {
				titleObj.info.keywordInTitle = true;
			}
			if (titleObj.content.split(' ')[0] === keyword) {
				titleObj.info.keywordStartsTitle = true;
			}
		}
		callback(titleObj);
	},

	/*---------------------------------------------------------------------
	|	checkDescription
	|
	|	Purpose: checking the description
	|
	|	Parameters: meta and keys
	|
	|	Returns: descriptionObj
	|
	|	TODO: Add more tests
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkDescription: function (meta, keys, callback) {
		var descriptionObj = {};
		descriptionObj.content = null;
		keys.forEach(function(key) {
			if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'description') {
				descriptionObj.content = meta[key].attribs.content;
				descriptionObj.status = 1;
				descriptionObj.message = 'Meta description looks good!';
			}
		});
		if (descriptionObj.content === null) {
			descriptionObj.status = 0;
			descriptionObj.message = 'Your site needs a meta description.';
		} else if (descriptionObj.content.length > 140 || descriptionObj.content.length < 170) {
			descriptionObj.status = 1;
			descriptionObj.message = 'It\'s good that you have a meta description, but it should be between 140 and 170 characters. Your\'s is at ' + descriptionObj.content.length + ' characters';
		}
		callback(descriptionObj);
	},

	/*---------------------------------------------------------------------
	|	checkKeywords
	|
	|	Purpose: checking the keywords
	|
	|	Parameters: meta and keys
	|
	|	Returns: keywordsObj
	|
	|	TODO: Add more tests
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkKeywords: function (meta, keys, callback) {
		var keywordsObj = {};
		keywordsObj.content = null;
		keys.forEach(function(key) {
			if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'keywords') {
				keywordsObj.content = meta[key].attribs.content;
				keywordsObj.status = 1;
				keywordsObj.message = 'Keywords looks good!';
			}
		});
		if (keywordsObj.content === null) {
			keywordsObj.status = 0;
			keywordsObj.message = 'Your site needs a meta keywords.';
		}
		callback(keywordsObj);
	},
};