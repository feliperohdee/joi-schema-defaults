const joi = require('joi');

const alternatives = [
    joi.object({
        a: joi.number().required(),
        b: joi.number().required()
    }),
    joi.object({
        a: joi.number().required(),
        c: joi.number().required()
    })
];

const object = {
    a: joi.number().required(),
    b: joi.number().required()
};

const when = joi.when('whenRef', {
    is: 5,
    then: joi.number().default(5),
    otherwise: joi.number().default(7)
});

const whenSwitch = joi.when('whenRef', {
    switch: [{
        is: 5,
        then: joi.number().default(5)
    }, {
        is: 6,
        then: joi.number().default(6)
    }],
    otherwise: joi.number().default(7)
});

const primarySchema = {
    // alternatives
    alternatives: joi.alternatives(alternatives),
    alternativesRequired: joi.alternatives(alternatives).required(),
    alternativesDefault: joi.alternatives(alternatives).default({
        a: 1,
        b: 2
    }),
    alternativesDefaultFunc: joi.alternatives(alternatives).default(() => {
        return {
            a: 1,
            b: 2
        };
    }),
    alternativesDefaultFuncAsync: joi.alternatives(alternatives).default(async () => {
        return {
            a: 1,
            b: 2
        };
    }),
    // array
    array: joi.array(),
    arrayRequired: joi.array().items(joi.string()).required(),
    arrayDefault: joi.array().items(joi.string()).default(['a']),
    arrayDefaultFunc: joi.array().items(joi.string()).default(() => {
        return ['a'];
    }),
    arrayDefaultFuncAsync: joi.array().items(joi.string()).default(async () => {
        return ['a'];
    }),
    // boolean
    boolean: joi.boolean(),
    booleanRequired: joi.boolean().required(),
    booleanDefault: joi.boolean().default(true),
    booleanDefaultFunc: joi.boolean().default(() => {
        return true;
    }),
    booleanDefaultFuncAsync: joi.boolean().default(async () => {
        return true;
    }),
    // date
    date: joi.date(),
    dateRequired: joi.date().required(),
    dateDefault: joi.date().default(582346800000),
    dateDefaultFunc: joi.date().default(() => {
        return 582346800000;
    }),
    dateDefaultFuncAsync: joi.date().default(async () => {
        return 582346800000;
    }),
    // date timestamp javascript
    dateTimestamp: joi.date().timestamp().default(582346800000),
    dateTimestampJavascript: joi.date().timestamp('javascript').default(582346800000),
    // date timestamp unix
    dateTimestampUnix: joi.date().timestamp('unix').default(582346800000),
    // number
    number: joi.number(),
    numberRequired: joi.number().required(),
    numberDefault: joi.number().default(1),
    numberDefaultFunc: joi.number().default(() => {
        return 1;
    }),
    numberDefaultFuncAsync: joi.number().default(async () => {
        return 1;
    }),
    // obj
    obj: joi.object(object),
    objRequired: joi.object(object).required(),
    objDefault: joi.object(object).default({
        a: 1,
        b: 2
    }),
    objDefaultFunc: joi.object(object).default(() => {
        return {
            a: 1,
            b: 2
        };
    }),
    objDefaultFuncAsync: joi.object(object).default(async () => {
        return {
            a: 1,
            b: 2
        };
    }),
    // string
    string: joi.string(),
    stringRequired: joi.string().required(),
    stringDefault: joi.string().default('default'),
    stringDefaultFunc: joi.string().default(() => {
        return 'default';
    }),
    stringDefaultFuncAsync: joi.string().default(async () => {
        return 'default';
    }),
    // string valid
    stringValid: joi.string().valid('bar', 'foo'),
    stringValidRequired: joi.string().valid('bar', 'foo').required(),
    stringValidDefault: joi.string().valid('bar', 'foo').default('foo'),
    stringValidDefaultFunc: joi.string().valid('bar', 'foo').default(() => {
        return 'foo';
    }),
    stringValidDefaultFuncAsync: joi.string().valid('bar', 'foo').default(async () => {
        return 'foo';
    }),
    // valid
    valid: joi.valid('bar', 'foo'),
    validRequired: joi.valid('bar', 'foo').required(),
    validDefault: joi.valid('bar', 'foo').default('foo'),
    validDefaultFunc: joi.valid('bar', 'foo').default(() => {
        return 'foo';
    }),
    validDefaultFuncAsync: joi.valid('bar', 'foo').default(async () => {
        return 'foo';
    }),
    // when
    whenRef: joi.number(),
    when,
    whenSwitch,
    // nested when
    nestedWhen: joi.when('whenRef', {
        is: 5,
        then: when,
        otherwise: when
    }),
    nestedWhenSwitch: joi.when('whenRef', {
        switch: [{
            is: 5,
            then: whenSwitch
        }, {
            is: 6,
            then: whenSwitch
        }],
        otherwise: whenSwitch
    })
};

const schema = joi.object({
    ...primarySchema,
    nested: joi.object(primarySchema).required()
});

module.exports = {
	alternatives,
	object,
	primarySchema,
	schema,
	when,
	whenSwitch
};