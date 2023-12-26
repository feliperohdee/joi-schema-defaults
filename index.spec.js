const _ = require('lodash');
const joi = require('joi');
const {
    expect
} = require('chai');

const generate = require('./');
const {
	object,
	primarySchema,
	schema
} = require('./schema');

describe('index', () => {
    it('should works without value', async () => {
        const result = await generate(schema);

        expect(result).to.deep.equal({
            alternatives: {
                a: 0,
                b: 0
            },
            alternativesRequired: {
                a: 0,
                b: 0
            },
            alternativesDefault: {
                a: 1,
                b: 2
            },
            alternativesDefaultFunc: {
                a: 1,
                b: 2
            },
            alternativesDefaultFuncAsync: {
                a: 1,
                b: 2
            },
            array: [],
            arrayRequired: [],
            arrayDefault: ['a'],
            arrayDefaultFunc: ['a'],
            arrayDefaultFuncAsync: ['a'],
            boolean: false,
            booleanRequired: false,
            booleanDefault: true,
            booleanDefaultFunc: true,
            booleanDefaultFuncAsync: true,
            date: new Date('1970-01-01T00:00:00.000Z'),
            dateRequired: new Date('1970-01-01T00:00:00.000Z'),
            dateDefault: new Date('1988-06-15T03:00:00.000Z'),
            dateDefaultFunc: new Date('1988-06-15T03:00:00.000Z'),
            dateDefaultFuncAsync: new Date('1988-06-15T03:00:00.000Z'),
            dateTimestamp: 582346800000,
            dateTimestampJavascript: 582346800000,
            dateTimestampUnix: 582346800000 / 1000,
            number: 0,
            numberRequired: 0,
            numberDefault: 1,
            numberDefaultFunc: 1,
            numberDefaultFuncAsync: 1,
            obj: {
                a: 0,
                b: 0
            },
            objRequired: {
                a: 0,
                b: 0
            },
            objDefault: {
                a: 1,
                b: 2
            },
            objDefaultFunc: {
                a: 1,
                b: 2
            },
            objDefaultFuncAsync: {
                a: 1,
                b: 2
            },
            string: '',
            stringRequired: '',
            stringDefault: 'default',
            stringDefaultFunc: 'default',
            stringDefaultFuncAsync: 'default',
            stringValid: 'bar',
            stringValidRequired: 'bar',
            stringValidDefault: 'foo',
            stringValidDefaultFunc: 'foo',
            stringValidDefaultFuncAsync: 'foo',
            valid: 'bar',
            validRequired: 'bar',
            validDefault: 'foo',
            validDefaultFunc: 'foo',
            validDefaultFuncAsync: 'foo',
            whenRef: 0,
            when: 7,
            whenSwitch: 7,
            nestedWhen: 7,
            nestedWhenSwitch: 7,
            nested: {
                alternatives: {
                    a: 0,
                    b: 0
                },
                alternativesRequired: {
                    a: 0,
                    b: 0
                },
                alternativesDefault: {
                    a: 1,
                    b: 2
                },
                alternativesDefaultFunc: {
                    a: 1,
                    b: 2
                },
                alternativesDefaultFuncAsync: {
                    a: 1,
                    b: 2
                },
                array: [],
                arrayRequired: [],
                arrayDefault: ['a'],
                arrayDefaultFunc: ['a'],
                arrayDefaultFuncAsync: ['a'],
                boolean: false,
                booleanRequired: false,
                booleanDefault: true,
                booleanDefaultFunc: true,
                booleanDefaultFuncAsync: true,
                date: new Date('1970-01-01T00:00:00.000Z'),
                dateRequired: new Date('1970-01-01T00:00:00.000Z'),
                dateDefault: new Date('1988-06-15T03:00:00.000Z'),
                dateDefaultFunc: new Date('1988-06-15T03:00:00.000Z'),
                dateDefaultFuncAsync: new Date('1988-06-15T03:00:00.000Z'),
                dateTimestamp: 582346800000,
                dateTimestampJavascript: 582346800000,
                dateTimestampUnix: 582346800000 / 1000,
                number: 0,
                numberRequired: 0,
                numberDefault: 1,
                numberDefaultFunc: 1,
                numberDefaultFuncAsync: 1,
                obj: {
                    a: 0,
                    b: 0
                },
                objRequired: {
                    a: 0,
                    b: 0
                },
                objDefault: {
                    a: 1,
                    b: 2
                },
                objDefaultFunc: {
                    a: 1,
                    b: 2
                },
                objDefaultFuncAsync: {
                    a: 1,
                    b: 2
                },
                string: '',
                stringRequired: '',
                stringDefault: 'default',
                stringDefaultFunc: 'default',
                stringDefaultFuncAsync: 'default',
                stringValid: 'bar',
                stringValidRequired: 'bar',
                stringValidDefault: 'foo',
                stringValidDefaultFunc: 'foo',
                stringValidDefaultFuncAsync: 'foo',
                valid: 'bar',
                validRequired: 'bar',
                validDefault: 'foo',
                validDefaultFunc: 'foo',
                validDefaultFuncAsync: 'foo',
                whenRef: 0,
                when: 7,
                whenSwitch: 7,
                nestedWhen: 7,
                nestedWhenSwitch: 7
            }
        });
    });

    describe('array', () => {
        it('should works with partial value', async () => {
            const schema = joi.object({
                array: joi.array().items(
                    joi.array().items(joi.string()),
                    joi.string(),
                    joi.number(),
                    joi.boolean(),
                    object
                )
            });

            const result = await generate(schema, {
                array: [
                    ['string', 1],
                    true,
                    false,
                    0,
                    1,
                    {},
                    'string'
                ]
            });

            expect(result).to.deep.equal({
                array: [
                    ['string'],
                    true,
                    false,
                    0,
                    1,
                    {
                        a: 0,
                        b: 0
                    },
                    'string'
                ]
            });
        });

        it('should works with any', async () => {
            const schema = joi.object({
                array: joi.array().items(
                    joi.any()
                )
            });

            const result = await generate(schema, {
                array: [null]
            });

            expect(result).to.deep.equal({
                array: [null]
            });
        });
        
		it('should works with object with when', async () => {
            const schema = joi.object({
                array: joi.array().items(
                    joi.object(_.pick(primarySchema, [
                        'whenRef',
                        'when',
                        'whenSwitch',
                        'nestedWhen',
                        'nestedWhenSwitch'
                    ]))
                )
            });

            const result = await generate(schema, {
                array: [{
                    whenRef: 5
                }]
            });

            expect(result).to.deep.equal({
                array: [{
                    whenRef: 5,
                    when: 5,
                    whenSwitch: 5,
                    nestedWhen: 5,
                    nestedWhenSwitch: 5
                }]
            });
        });
		
		it('should works with object with when with ancestor value', async () => {
            const schema = joi.object({
                array: joi.array().items(
                    joi.object({
						when: joi.when('/whenRef', {
							is: 5,
							then: joi.number().default(5),
							otherwise: joi.number().default(7)
						}),
						whenSwitch: joi.when('....whenRef', {
							switch: [{
								is: 5,
								then: joi.number().default(5)
							}, {
								is: 6,
								then: joi.number().default(6)
							}],
							otherwise: joi.number().default(7)
						})
					})
                ),
				whenRef: joi.number()
            });

            const result = await generate(schema, {
                array: [{}],
				whenRef: 5
            });

            expect(result).to.deep.equal({
                array: [{
                    when: 5,
					whenSwitch: 5
                }],
				whenRef: 5
            });
        });
    });

    describe('alternatives', () => {
        it('should works with partial value', async () => {
            const schema = joi.object(_.pick(primarySchema, [
                'alternatives',
                'alternativesDefault',
                'alternativesDefaultFunc',
                'alternativesDefaultFuncAsync'
            ]));

            const result = await generate(schema, {
                alternatives: {
                    a: 10
                },
                alternativesDefault: {
                    a: 10
                },
                alternativesDefaultFunc: {
                    a: 10
                },
                alternativesDefaultFuncAsync: {
                    a: 10
                }
            });

            expect(result).to.deep.equal({
                alternatives: {
                    a: 10,
                    b: 0
                },
                alternativesDefault: {
                    a: 10,
                    b: 0
                },
                alternativesDefaultFunc: {
                    a: 10,
                    b: 0
                },
                alternativesDefaultFuncAsync: {
                    a: 10,
                    b: 0
                }
            });
        });
    });

    describe('object', () => {
        it('should works with partial value', async () => {
            const schema = joi.object(_.pick(primarySchema, [
                'obj',
                'objDefault',
                'objDefaultFunc',
                'objDefaultFuncAsync'
            ]));

            const result = await generate(schema, {
                obj: {
                    a: 10
                },
                objDefault: {
                    a: 10
                },
                objDefaultFunc: {
                    a: 10
                },
                objDefaultFuncAsync: {
                    a: 10
                }
            });

            expect(result).to.deep.equal({
                obj: {
                    a: 10,
                    b: 0
                },
                objDefault: {
                    a: 10,
                    b: 0
                },
                objDefaultFunc: {
                    a: 10,
                    b: 0
                },
                objDefaultFuncAsync: {
                    a: 10,
                    b: 0
                }
            });
        });
        
		it('should works with unknown object', async () => {
            const schema = joi.object().unknown();
            const result = await generate(schema, {
                a: 10
            });

            expect(result).to.deep.equal({
				a: 10
			});
        });
    });

    describe('when', () => {
        it('should works with partial value', async () => {
            const schema = joi.object(_.pick(primarySchema, [
                'whenRef',
                'when',
                'whenSwitch',
                'nestedWhen',
                'nestedWhenSwitch'
            ]));

            const result = await generate(schema, {
                whenRef: 5
            });

            expect(result).to.deep.equal({
                whenRef: 5,
                when: 5,
                whenSwitch: 5,
                nestedWhen: 5,
                nestedWhenSwitch: 5
            });
        });
    });
});