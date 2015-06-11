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
		}
		callback(descriptionObj);
	}
};