const _ = require('lodash');

const util = require('./util');

module.exports = async ({
	context,
	schema,
	value
}) => {
	let result = await util.handleDefault({
		context,
		defaultValue: {},
		schema,
		value
	});

	const {
		flags = {},
		keys = []
	} = schema;

	if (!flags.unknown) {
		result = await Promise.all(_.map(keys, async (schema, key) => {
			const handler = await context.tf.seek(schema);
	
			return [key, await handler({
				context: {
					...context,
					path: [...context.path, key]
				},
				schema,
				value: _.get(result, key)
			})];
		}));
	
		return _.fromPairs(result);
	}

	return result;
};
