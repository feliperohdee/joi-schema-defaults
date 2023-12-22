const _ = require('lodash');

module.exports = async ({
	context,
	schema,
	value
}) => {
	const match = _.first(schema.matches);
	const handler = await context.tf.seek(match.schema);

	schema = {
		...match.schema,
		allow: [
			...schema.allow || [],
			...match.schema.allow || []
		],
		flags: {
			...schema.flags,
			...match.schema.flags
		}
	};

	return handler({
		context,
		schema,
		value
	});
};
