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
			if (titleObj.content.toLowerCase().indexOf(keyword) > -1) {
				titleObj.info.keywordInTitle = true;
			}
			if (titleObj.content.toLowerCase().split(' ')[0] === keyword) {
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
	|	Parameters: meta and keyword
	|
	|	Returns: descriptionObj
	|
	|	TODO: Add more tests
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkDescription: function (meta, keyword, callback) {
		var descriptionObj = {},
			keys = Object.keys(meta);
		descriptionObj.content = null;
		keys.forEach(function (key) {
			if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'description') {
				descriptionObj.content = meta[key].attribs.content;
				descriptionObj.status = 1;
				descriptionObj.message = 'Meta description looks good!';
				descriptionObj.info = {};
				descriptionObj.info.stringLength = meta[key].attribs.content.length;
				descriptionObj.info.keywordInDescription = false;
				descriptionObj.info.keywordStartsDescription = false;
				if (descriptionObj.content.toLowerCase().indexOf(keyword) > -1) {
					descriptionObj.info.keywordInDescription = true;
				}
				if (descriptionObj.content.toLowerCase().split(' ')[0] === keyword) {
					descriptionObj.info.keywordStartsDescription = true;
				}
			}
		});
		if (descriptionObj.content === null) {
			descriptionObj.status = 0;
			descriptionObj.message = 'Your site needs a meta description.';
		} else if (descriptionObj.content.length > 140 || descriptionObj.content.length < 170) {
			descriptionObj.message = 'It\'s good that you have a meta description, but it should be between 140 and 170 characters. Your\'s is at ' + descriptionObj.content.length + ' characters';
		}
		callback(descriptionObj);
	},

	/*---------------------------------------------------------------------
	|	checkKeywords
	|
	|	Purpose: checking the keywords
	|
	|	Parameters: meta
	|
	|	Returns: keywordsObj
	|
	|	TODO: Add more tests
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkKeywords: function (meta, callback) {
		var keywordsObj = {},
			keys = Object.keys(meta);
		keywordsObj.content = null;
		keys.forEach(function (key) {
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

	/*---------------------------------------------------------------------
	|	checkHeaderTags
	|
	|	Purpose: checking the header tags
	|
	|	Parameters: h1, h2, h3, and keyword
	|
	|	Returns: headerTagObj
	|
	|	TODO: Add more tests, DRY up code
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkHeaderTags: function (h1, h2, h3, keyword, callback) {
		var headerTagObj = {};
		headerTagObj.info = {};
		headerTagObj.h1 = {};
		if (h1 && h1.text() && (h1.text().trim().match(/[a-z]/i) !== -1 && h1.text().trim().match(/[a-z]/i) !== null)) {
			headerTagObj.h1.content = h1.text().trim();
			headerTagObj.h1.status = 1;
			headerTagObj.h1.info = {};
			headerTagObj.h1.info.keywordInHeaderOne = false;
			headerTagObj.h1.info.keywordStartsHeaderOne = false;
			if (headerTagObj.h1.content.toLowerCase().indexOf(keyword) > -1) {
				headerTagObj.h1.info.keywordInHeaderOne = true;
			}
			if (headerTagObj.h1.content.toLowerCase().split(' ')[0] === keyword) {
				headerTagObj.h1.info.keywordStartsHeaderOne = true;
			}
		} else {
			headerTagObj.h1.status = 0;
			headerTagObj.h1.message = 'There is no text in the first H1 on your page';
		}
		headerTagObj.h2 = {};
		if (h2 && h2.text() && (h2.text().trim().match(/[a-z]/i) !== -1 && h2.text().trim().match(/[a-z]/i) !== null)) {
			headerTagObj.h2.content = h2.text().trim();
			headerTagObj.h2.status = 1;
		} else {
			headerTagObj.h2.status = 0;
			headerTagObj.h2.message = 'There is no text in the first H2 on your page';
		}
		headerTagObj.h3 = {};
		if (h3 && h3.text() && (h3.text().trim().match(/[a-z]/i) !== -1 && h3.text().trim().match(/[a-z]/i) !== null)) {
			headerTagObj.h3.content = h3.text().trim();
			headerTagObj.h3.status = 1;
		} else {
			headerTagObj.h3.status = 0;
			headerTagObj.h3.message = 'There is no text in the first H3 on your page';
		}
		headerTagObj.info.doHeaderingsExist = false;
		if (headerTagObj.h1.status === 1 || headerTagObj.h2.status === 1 || headerTagObj.h3.status === 1) {
			headerTagObj.info.doHeaderingsExist = true;
		}
		headerTagObj.info.headerDuplicate = false;
		if ((headerTagObj.h1.content && headerTagObj.h2.content && headerTagObj.h1.content === headerTagObj.h2.content) || (headerTagObj.h1.content && headerTagObj.h3.content && headerTagObj.h1.content === headerTagObj.h3.content) || (headerTagObj.h2.content && headerTagObj.h3.content && headerTagObj.h2.content === headerTagObj.h3.content)) {
			headerTagObj.info.headerDuplicate = true;
		}
		callback(headerTagObj);
	},

	/*---------------------------------------------------------------------
	|	checkImages
	|
	|	Purpose: checking the images
	|
	|	Parameters: img
	|
	|	Returns: imagesObj
	|
	|	TODO: Add more tests
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkImages: function (img, callback) {
		var imagesObj = {},
			keys = Object.keys(img);
		imagesObj.info = {};
		imagesObj.info.imageCount = 0;
		imagesObj.info.URLArray = [];
		imagesObj.info.missingAlt = [];
		imagesObj.status = 0;
		keys.forEach(function (key) {
			if (img[key].attribs && img[key].attribs.src) {
				imagesObj.info.imageCount = imagesObj.info.imageCount + 1;
				imagesObj.info.URLArray.push(img[key].attribs.src);
				imagesObj.status = 1;
				if (!img[key].attribs.alt) {
					imagesObj.info.missingAlt.push(img[key].attribs.src);
				}
			}
		});
		if (imagesObj.status === 0) {
			imagesObj.message = 'You have no images';
		}
		callback(imagesObj);
	}
};
