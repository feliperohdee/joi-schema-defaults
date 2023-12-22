const _ = require('lodash');

const util = require('./util');

module.exports = async ({
	context,
	schema,
	value
}) => {
	let result = await util.handleDefault({
		context,
		defaultValue: new Date(0),
		schema,
		value
	});

	if (!_.isDate(result)) {
		result = new Date(result);

		if (_.isNaN(result.getTime())) {
			result = new Date(0);
		}
	}

	return result;
};
