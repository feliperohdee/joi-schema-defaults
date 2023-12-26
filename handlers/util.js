const _ = require('lodash');

const getPathAncestor = (path, ancestor = 1) => {
	if (ancestor === 'root') {
		return [];
	}

	if (_.isString(path)) {
		path = _.toPath(path);
	}

	if (ancestor !== 0) {
		path = _.slice(path, 0, -ancestor);
	}

	return path;
};

const handleDefault = async ({
	context,
	defaultValue,
	schema,
	value
}) => {
	let result = value;
	let {
		allow = [],
		flags = {},
		whens = []
	} = schema;

	if (_.size(whens) === 1) {
		const when = _.first(whens);
		const refValue = _.get(context.value, [
			...getPathAncestor(context.path, when.ref.ancestor), 
			...when.ref.path
		]);

		const match = async (when) => {
			if (!_.isArray(when.is?.allow)) {
				return;
			}
			
			const match = _.includes(when.is.allow, refValue);
			const schema = (match && when.then) || when.otherwise;

			if (!schema) {
				return;
			}

			const handler = await context.tf.seek(schema);

			return handler({
				context,
				schema,
				value
			});
		};

		if (when.is) {
			result = await match(when);
		} else if (_.isArray(when.switch)) {
			for (const _when of when.switch) {
				result = await match(_when);

				if (!_.isUndefined(result)) {
					break;
				}
			}
		}
	}

	if (
		_.isUndefined(result) &&
		_.isFunction(flags.default)
	) {
		result = await flags.default();
	}
	
	if (
		_.isUndefined(result) &&
		!_.isUndefined(flags.default)
	) {
		result = flags.default;
	}

	if (
		_.isUndefined(result) &&
		_.size(allow)
	) {
		result = _.first(allow);
	}

	if (_.isUndefined(result)) {
		result = defaultValue;
	}

	return result;
};

module.exports = {
	handleDefault
};