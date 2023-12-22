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

	const {
		flags = {}
	} = schema;

	if (!_.isDate(result)) {
		result = new Date(result);

		if (_.isNaN(result.getTime())) {
			result = new Date(0);
		}
	}

	if (flags.format === 'javascript') {
		result = result.getTime();
	}
	
	if (flags.format === 'unix') {
		result = result.getTime() / 1000;
	}

	return result;
};
