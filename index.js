const desc = require('./describe');

class TypeFactory {
	constructor() {
		this.handlers = {
			alternatives: require('./handlers/alternatives'),
			any: require('./handlers/any'),
			array: require('./handlers/array'),
			boolean: require('./handlers/boolean'),
			date: require('./handlers/date'),
			number: require('./handlers/number'),
			object: require('./handlers/object'),
			string: require('./handlers/string')
		};
	}

	async seek(schema) {
		const handler = this.handlers[schema.type];

		if (!handler) {
			throw new Error(`No handler has been implemented for "${schema.type}" yet.`);
		}

		return handler;
	}
}

const tf = new TypeFactory();

module.exports = async (schema, value) => {
	schema = desc(schema);
	const handler = await tf.seek(schema);
	
	return handler({
		context: {
			path: [],
			tf,
			value
		},
		schema,
		value
	});
};
