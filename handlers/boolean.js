const util = require('./util');

module.exports = async ({
	context,
	schema,
	value
}) => {
	return util.handleDefault({
		context,
		defaultValue: false,
		schema,
		value
	});
};
