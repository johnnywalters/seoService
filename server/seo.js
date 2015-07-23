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
			if (titleObj.content.toLowerCase().substring(0, keyword.length) === keyword) {
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
				if (descriptionObj.content.toLowerCase().substring(0, keyword.length) === keyword) {
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
		keywordsObj.info = {};
		keywordsObj.content = null;
		keywordsObj.info.keywordCount = 0;
		keys.forEach(function (key) {
			if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'keywords') {
				keywordsObj.content = meta[key].attribs.content;
				keywordsObj.status = 1;
				keywordsObj.message = 'Keywords looks good!';
				keywordsObj.info.keywordCount = keywordsObj.content.split(' ').length;
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
	checkHeaderTags: function (h1, h1Arr, h2, h2Arr, h3, h3Arr, keyword, callback) {
		var headerTagObj = {};
		headerTagObj.info = {};
		headerTagObj.h1 = {};
		if (h1 && h1.text() && (h1.text().trim().match(/[a-z]/i) !== -1 && h1.text().trim().match(/[a-z]/i) !== null)) {
			headerTagObj.h1.content = h1.text().trim();
			headerTagObj.h1.status = 1;
			headerTagObj.h1.info = {};
			headerTagObj.h1.info.keywordInHeader = false;
			headerTagObj.h1.info.keywordStartsHeader = false;
			if (headerTagObj.h1.content.toLowerCase().indexOf(keyword) > -1) {
				headerTagObj.h1.info.keywordInHeader = true;
			}
			if (headerTagObj.h1.content.toLowerCase().substring(0, keyword.length) === keyword) {
				headerTagObj.h1.info.keywordStartsHeader = true;
			}
			var h1Keys = Object.keys(h1Arr);
			headerTagObj.h1.info.keywordInAnyHeaders = false;
			h1Keys.forEach(function (key) {
				if (h1Arr[key] && h1Arr[key].name && h1Arr[key].name === 'h1' && h1Arr[key].children[0].data) {
					if (h1Arr[key].children[0].data.toLowerCase().indexOf(keyword) > -1) {
						headerTagObj.h1.info.keywordInAnyHeaders = true;
					}
				}
			});
		} else {
			headerTagObj.h1.status = 0;
			headerTagObj.h1.message = 'There is no text in the first H1 on your page';
		}
		headerTagObj.h2 = {};
		if (h2 && h2.text() && (h2.text().trim().match(/[a-z]/i) !== -1 && h2.text().trim().match(/[a-z]/i) !== null)) {
			headerTagObj.h2.content = h2.text().trim();
			headerTagObj.h2.status = 1;
			headerTagObj.h2.info = {};
			headerTagObj.h2.info.keywordInHeader = false;
			headerTagObj.h2.info.keywordStartsHeader = false;
			if (headerTagObj.h2.content.toLowerCase().indexOf(keyword) > -1) {
				headerTagObj.h2.info.keywordInHeader = true;
			}
			if (headerTagObj.h2.content.toLowerCase().substring(0, keyword.length) === keyword) {
				headerTagObj.h2.info.keywordStartsHeader = true;
			}
			var h2Keys = Object.keys(h2Arr);
			headerTagObj.h2.info.keywordInAnyHeaders = false;
			h2Keys.forEach(function (key) {
				if (h2Arr[key] && h2Arr[key].name && h2Arr[key].name === 'h2' && h2Arr[key].children[0].data) {
					if (h2Arr[key].children[0].data.toLowerCase().indexOf(keyword) > -1) {
						headerTagObj.h2.info.keywordInAnyHeaders = true;
					}
				}
			});
		} else {
			headerTagObj.h2.status = 0;
			headerTagObj.h2.message = 'There is no text in the first H2 on your page';
		}
		headerTagObj.h3 = {};
		if (h3 && h3.text() && (h3.text().trim().match(/[a-z]/i) !== -1 && h3.text().trim().match(/[a-z]/i) !== null)) {
			headerTagObj.h3.content = h3.text().trim();
			headerTagObj.h3.status = 1;
			headerTagObj.h3.info = {};
			headerTagObj.h3.info.keywordInHeader = false;
			headerTagObj.h3.info.keywordStartsHeader = false;
			if (headerTagObj.h3.content.toLowerCase().indexOf(keyword) > -1) {
				headerTagObj.h3.info.keywordInHeader = true;
			}
			if (headerTagObj.h3.content.toLowerCase().substring(0, keyword.length) === keyword) {
				headerTagObj.h3.info.keywordStartsHeader = true;
			}
			var h3Keys = Object.keys(h3Arr);
			headerTagObj.h3.info.keywordInAnyHeaders = false;
			h3Keys.forEach(function (key) {
				if (h3Arr[key] && h3Arr[key].name && h3Arr[key].name === 'h3' && h3Arr[key].children[0].data) {
					if (h3Arr[key].children[0].data.toLowerCase().indexOf(keyword) > -1) {
						headerTagObj.h3.info.keywordInAnyHeaders = true;
					}
				}
			});
		} else {
			headerTagObj.h3.status = 0;
			headerTagObj.h3.message = 'There is no text in the first H3 on your page';
		}
		headerTagObj.info.doHeadersExist = false;
		if (headerTagObj.h1.status === 1 && headerTagObj.h2.status === 1 && headerTagObj.h3.status === 1) {
			headerTagObj.info.doHeadersExist = true;
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
	checkImages: function (img, keyword, callback) {
		var imagesObj = {},
			keys = Object.keys(img);
		imagesObj.info = {};
		imagesObj.info.imageCount = 0;
		imagesObj.info.URLArray = [];
		imagesObj.info.imageNames = [];
		imagesObj.info.missingAlt = [];
		imagesObj.info.underscoreInImageName = [];
		imagesObj.info.keywordInImageName = false;
		imagesObj.status = 0;
		keys.forEach(function (key) {
			if (img[key].attribs && img[key].attribs.src) {
				imagesObj.info.imageCount = imagesObj.info.imageCount + 1;
				imagesObj.info.URLArray.push(img[key].attribs.src);
				imagesObj.info.imageNames.push(img[key].attribs.src.substr(img[key].attribs.src.lastIndexOf('/') + 1));
				imagesObj.status = 1;
				if (!img[key].attribs.alt) {
					imagesObj.info.missingAlt.push(img[key].attribs.src.substr(img[key].attribs.src.lastIndexOf('/') + 1));
				}
				if (img[key].attribs.src.substr(img[key].attribs.src.lastIndexOf('/') + 1).indexOf('_') !== -1) {
					imagesObj.info.underscoreInImageName.push(img[key].attribs.src.substr(img[key].attribs.src.lastIndexOf('/') + 1));
				}
				if (img[key].attribs.src.substr(img[key].attribs.src.lastIndexOf('/') + 1).replace(/-/g, ' ').indexOf(keyword) !== -1) {
					imagesObj.info.keywordInImageName = true;
				}
			}
		});
		if (imagesObj.status === 0) {
			imagesObj.message = 'You have no images';
		}
		callback(imagesObj);
	},

	/*---------------------------------------------------------------------
	|	checkLinks
	|
	|	Purpose: checking the link
	|
	|	Parameters: links
	|
	|	Returns: linksObj
	|
	|	TODO: Add more tests
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkLinks: function (links, orgURL, callback) {
		var linksObj = {},
			keys = Object.keys(links);
		linksObj.info = {};
		linksObj.info.linkCount = 0;
		linksObj.info.noFollowCount = 0;
		linksObj.info.externalCount = 0;
		keys.forEach(function (key) {
			if (links[key].attribs && links[key].attribs.href) {
				linksObj.info.linkCount = linksObj.info.linkCount + 1;
				if (links[key].attribs.rel && links[key].attribs.rel === 'nofollow') {
					linksObj.info.noFollowCount = linksObj.info.noFollowCount + 1;
				}
				if (links[key].attribs.href.substring(0, 1) !== '/' && links[key].attribs.href.substring(0, 1) !== '#' && links[key].attribs.href.substring(0, 10) !== 'javascript') {
					var orgURLDomain = orgURL.split('/');
					orgURLDomain = orgURLDomain[2].replace('www.', '');
					var linkDomain = links[key].attribs.href.split('/');
					if (linkDomain[2]) {
						linkDomain = linkDomain[2].replace('www.', '');
					} else {
						linkDomain = linkDomain[0].replace('www.', '');
					}
					if (linkDomain !== orgURLDomain) {
						linksObj.info.externalCount = linksObj.info.externalCount + 1;
					}
				}
			}
		});
		callback(linksObj);
	},

	/*---------------------------------------------------------------------
	|	checkMiscellaneous
	|
	|	Purpose: checking the miscellaneous items
	|
	|	Parameters: link
	|
	|	Returns: miscellaneousObj
	|
	|	TODO: Add more tests
	|
	|	Tests: Unknown
	*---------------------------------------------------------------------*/
	checkMiscellaneous: function (link, meta, callback) {
		var miscellaneousObj = {},
			linkKeys = Object.keys(link),
			metaKeys = Object.keys(meta);
		miscellaneousObj.info = {};
		miscellaneousObj.info.hasFavicon = false;
		miscellaneousObj.info.hasAppleIcon = false;
		linkKeys.forEach(function (key) {
			if (link[key].attribs && link[key].attribs.rel && link[key].attribs.rel.indexOf('icon') !== -1) {
				miscellaneousObj.info.hasFavicon = true;
			}
			if (link[key].attribs && link[key].attribs.rel && link[key].attribs.rel.indexOf('apple-touch-icon') !== -1) {
				miscellaneousObj.info.hasAppleIcon = true;
			}
		});
		miscellaneousObj.info.hasViewPort = false;
		metaKeys.forEach(function (key) {
			if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'viewport') {
				miscellaneousObj.info.hasViewPort = true;
			}
		});
		callback(miscellaneousObj);
	}
};
