const _ = require('lodash');

const util = require('./util');

module.exports = async ({
    context,
    schema,
    value
}) => {
    const allowedSchema = (type) => {
        return _.find(schema.items, {
            type
        });
    };

    if (_.isArray(value)) {
        value = await Promise.all(
            _.map(value, async (value, index) => {
                let handler = null;
                let schema = allowedSchema('any');

                if (_.isArray(value)) {
                    schema = allowedSchema('array');
                } else if (_.isBoolean(value)) {
                    schema = allowedSchema('boolean');
                } else if (
                    _.isNumber(value) &&
                    !_.isNaN(value)
                ) {
                    schema = allowedSchema('number');
                } else if (_.isObject(value)) {
                    schema = allowedSchema('object');
                } else if (_.isString(value)) {
                    schema = allowedSchema('string');
                }

                if (!schema) {
                    return;
                }

                handler = await context.tf.seek(schema);
                context = {
                    ...context,
                    path: [
                        ...context.path,
                        index
                    ]
                };

                const result = await handler({
                    context,
                    schema,
                    value
                });

                if (_.isUndefined(result)) {
                    return;
                }

                return result;
            })
        );

		value = _.filter(value, (value) => {
			return !_.isUndefined(value);
		});
    }

    return util.handleDefault({
        context,
        defaultValue: [],
        schema,
        value
    });
};