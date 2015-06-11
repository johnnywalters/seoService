module.exports = {
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
	}
};