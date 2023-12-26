const _ = require('lodash');

const describeValues = schema => {
	let normalized = [];

	if (schema._override) {
		normalized = normalized.concat({
			override: true
		});
	}

	for (const value of schema._values.values()) {
		normalized = normalized.concat(value && _.isObjectLike(value) ? {
			value
		} : value);
	}

	for (const value of schema._refs.values()) {
		normalized = normalized.concat(describe(value));
	}

	return normalized;
};

const describeRef = schema => {
	const ref = {
		path: schema.path
	};

	if (schema.type !== 'value') {
		ref.type = schema.type;
	}

	if (schema.separator !== '.') {
		ref.separator = schema.separator;
	}

	if (schema.type === 'value' && schema.ancestor !== 1) {
		ref.ancestor = schema.ancestor;
	}

	if (schema.map) {
		ref.map = [...schema.map];
	}

	for (const key of [
		'adjust',
		'iterables',
		'render'
	]) {
		if (!_.isNil(schema[key])) {
			ref[key] = schema[key];
		}
	}

	if (schema.in !== false) {
		ref.in = true;
	}

	return ref;
};

const internalDescribe = (item, options = {}) => {
    if (_.isArray(item)) {
        return item.map(internalDescribe);
    }

    if (!_.isObjectLike(item) || _.isNull(item)) {
        return item;
    }

	if (options.assign === 'options') {
        return _.cloneDeep(item);
    }

    if (_.isBuffer(item)) {
        return {
            buffer: item.toString('binary')
        };
    }

    if (_.isDate(item)) {
        return item.toISOString();
    }

    if (_.isError(item)) {
        return item;
    }

    if (_.isRegExp(item)) {
		if (options.assign === 'regex') {
            return item.toString();
        }

        return {
            regex: item.toString()
        };
    }

    if (_.isFunction(item.describe)) {
		if (options.assign === 'ref') {
            return describeRef(item);
        }

		return describe(item);
    }

    const normalized = {};

    for (const key in item) {
        const value = item[key];

        if (_.isUndefined(value)) {
            continue;
        }

        normalized[key] = internalDescribe(value, {
			assign: key
		});
    }

    return normalized;
};

const describe = schema => {
    const def = schema._definition;

    // Type
    const desc = {
        type: schema.type,
        flags: {}
    };

    // Flags
    for (const flag in schema._flags) {
        if (flag[0] !== '_') {
            desc.flags[flag] = internalDescribe(schema._flags[flag]);
        }
    }

    if (!_.keys(desc.flags).length) {
        delete desc.flags;
    }

    // Allow / Invalid
    if (schema._valids) {
        desc.allow = describeValues(schema._valids);
    }

    if (schema._invalids) {
        desc.invalid = describeValues(schema._invalids);
    }

    // Terms (must be last to verify no name conflicts)
    for (const term in schema.$_terms) {
        if (term[0] === '_') {
            continue;
        }

		if (desc[term]) {
			throw new Error(`Cannot describe schema due to internal name conflict with ${term}`);
		}

        const items = schema.$_terms[term];

        if (!items) {
            continue;
        }

        if (_.isMap(items)) {
            if (items.size) {
                desc[term] = [...items.entries()];
            }

            continue;
        }

		if (!def.terms[term]) {
			throw new Error(`Term ${term} missing configuration`);
		}

        const manifest = def.terms[term].manifest;
        const mapped = _.isObject(manifest);

        if (!items.length && !mapped) {
            continue;
        }

        const normalized = [];

        for (const item of items) {
            normalized.push(internalDescribe(item));
        }

        // Mapped
        if (mapped) {
            const {
                from,
                to
            } = manifest.mapped;

            desc[term] = {};
            
			for (const item of normalized) {
                desc[term][item[to]] = item[from];
            }

            continue;
        }

        // Single
        if (manifest === 'single') {
			if (normalized.length !== 1) {
				throw new Error(`Term ${term} contains more than one item`);
			}

            desc[term] = normalized[0];
            continue;
        }

        // Array
        desc[term] = normalized;
    }

    return desc;
};

module.exports = describe;