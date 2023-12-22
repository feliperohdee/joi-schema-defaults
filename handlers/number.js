const util = require('./util');

module.exports = async ({
	context,
	schema,
	value
}) => {
	return util.handleDefault({
		context,
		defaultValue: 0,
		schema,
		value
	});

};
