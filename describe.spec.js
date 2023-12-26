const joi = require('joi');
const {
    expect
} = require('chai');

const desc = require('./describe');
const {
    primarySchema
} = require('./schema');

describe('describe', () => {
    it('should works', () => {
        const result = desc(joi.object(primarySchema));

        expect(JSON.parse(JSON.stringify(result, null, 2))).to.deep.equal({
            type: 'object',
            keys: {
                alternatives: {
                    type: 'alternatives',
                    matches: [{
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                b: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }, {
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                c: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }]
                },
                alternativesRequired: {
                    type: 'alternatives',
                    flags: {
                        presence: 'required'
                    },
                    matches: [{
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                b: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }, {
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                c: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }]
                },
                alternativesDefault: {
                    type: 'alternatives',
                    flags: {
                        'default': {
                            a: 1,
                            b: 2
                        }
                    },
                    matches: [{
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                b: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }, {
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                c: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }]
                },
                alternativesDefaultFunc: {
                    type: 'alternatives',
                    flags: {},
                    matches: [{
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                b: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }, {
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                c: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }]
                },
                alternativesDefaultFuncAsync: {
                    type: 'alternatives',
                    flags: {},
                    matches: [{
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                b: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }, {
                        schema: {
                            type: 'object',
                            keys: {
                                a: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                },
                                c: {
                                    type: 'number',
                                    flags: {
                                        presence: 'required'
                                    }
                                }
                            }
                        }
                    }]
                },
                array: {
                    type: 'array'
                },
                arrayRequired: {
                    type: 'array',
                    flags: {
                        presence: 'required'
                    },
                    items: [{
                        type: 'string'
                    }]
                },
                arrayDefault: {
                    type: 'array',
                    flags: {
                        'default': [
                            'a'
                        ]
                    },
                    items: [{
                        type: 'string'
                    }]
                },
                arrayDefaultFunc: {
                    type: 'array',
                    flags: {},
                    items: [{
                        type: 'string'
                    }]
                },
                arrayDefaultFuncAsync: {
                    type: 'array',
                    flags: {},
                    items: [{
                        type: 'string'
                    }]
                },
                'boolean': {
                    type: 'boolean'
                },
                booleanRequired: {
                    type: 'boolean',
                    flags: {
                        presence: 'required'
                    }
                },
                booleanDefault: {
                    type: 'boolean',
                    flags: {
                        'default': true
                    }
                },
                booleanDefaultFunc: {
                    type: 'boolean',
                    flags: {}
                },
                booleanDefaultFuncAsync: {
                    type: 'boolean',
                    flags: {}
                },
                date: {
                    type: 'date'
                },
                dateRequired: {
                    type: 'date',
                    flags: {
                        presence: 'required'
                    }
                },
                dateDefault: {
                    type: 'date',
                    flags: {
                        'default': 582346800000
                    }
                },
                dateDefaultFunc: {
                    type: 'date',
                    flags: {}
                },
                dateDefaultFuncAsync: {
                    type: 'date',
                    flags: {}
                },
                dateTimestamp: {
                    type: 'date',
                    flags: {
                        format: 'javascript',
                        'default': 582346800000
                    }
                },
                dateTimestampJavascript: {
                    type: 'date',
                    flags: {
                        format: 'javascript',
                        'default': 582346800000
                    }
                },
                dateTimestampUnix: {
                    type: 'date',
                    flags: {
                        format: 'unix',
                        'default': 582346800000
                    }
                },
                number: {
                    type: 'number'
                },
                numberRequired: {
                    type: 'number',
                    flags: {
                        presence: 'required'
                    }
                },
                numberDefault: {
                    type: 'number',
                    flags: {
                        'default': 1
                    }
                },
                numberDefaultFunc: {
                    type: 'number',
                    flags: {}
                },
                numberDefaultFuncAsync: {
                    type: 'number',
                    flags: {}
                },
                obj: {
                    type: 'object',
                    keys: {
                        a: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        },
                        b: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        }
                    }
                },
                objRequired: {
                    type: 'object',
                    flags: {
                        presence: 'required'
                    },
                    keys: {
                        a: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        },
                        b: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        }
                    }
                },
                objDefault: {
                    type: 'object',
                    flags: {
                        'default': {
                            a: 1,
                            b: 2
                        }
                    },
                    keys: {
                        a: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        },
                        b: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        }
                    }
                },
                objDefaultFunc: {
                    type: 'object',
                    flags: {},
                    keys: {
                        a: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        },
                        b: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        }
                    }
                },
                objDefaultFuncAsync: {
                    type: 'object',
                    flags: {},
                    keys: {
                        a: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        },
                        b: {
                            type: 'number',
                            flags: {
                                presence: 'required'
                            }
                        }
                    }
                },
                string: {
                    type: 'string'
                },
                stringRequired: {
                    type: 'string',
                    flags: {
                        presence: 'required'
                    }
                },
                stringDefault: {
                    type: 'string',
                    flags: {
                        'default': 'default'
                    }
                },
                stringDefaultFunc: {
                    type: 'string',
                    flags: {}
                },
                stringDefaultFuncAsync: {
                    type: 'string',
                    flags: {}
                },
                stringValid: {
                    type: 'string',
                    flags: {
                        only: true
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                stringValidRequired: {
                    type: 'string',
                    flags: {
                        only: true,
                        presence: 'required'
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                stringValidDefault: {
                    type: 'string',
                    flags: {
                        only: true,
                        'default': 'foo'
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                stringValidDefaultFunc: {
                    type: 'string',
                    flags: {
                        only: true
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                stringValidDefaultFuncAsync: {
                    type: 'string',
                    flags: {
                        only: true
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                valid: {
                    type: 'any',
                    flags: {
                        only: true
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                validRequired: {
                    type: 'any',
                    flags: {
                        only: true,
                        presence: 'required'
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                validDefault: {
                    type: 'any',
                    flags: {
                        only: true,
                        'default': 'foo'
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                validDefaultFunc: {
                    type: 'any',
                    flags: {
                        only: true
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                validDefaultFuncAsync: {
                    type: 'any',
                    flags: {
                        only: true
                    },
                    allow: [
                        'bar',
                        'foo'
                    ]
                },
                whenRef: {
                    type: 'number'
                },
                when: {
                    type: 'any',
                    whens: [{
                        ref: {
                            path: [
                                'whenRef'
                            ]
                        },
                        is: {
                            type: 'any',
                            flags: {
                                only: true,
                                presence: 'required'
                            },
                            allow: [{
                                    override: true
                                },
                                5
                            ]
                        },
                        then: {
                            type: 'number',
                            flags: {
                                'default': 5
                            }
                        },
                        otherwise: {
                            type: 'number',
                            flags: {
                                'default': 7
                            }
                        }
                    }]
                },
                whenSwitch: {
                    type: 'any',
                    whens: [{
                        ref: {
                            path: [
                                'whenRef'
                            ]
                        },
                        'switch': [{
                                is: {
                                    type: 'any',
                                    flags: {
                                        only: true,
                                        presence: 'required'
                                    },
                                    allow: [{
                                            override: true
                                        },
                                        5
                                    ]
                                },
                                then: {
                                    type: 'number',
                                    flags: {
                                        'default': 5
                                    }
                                }
                            },
                            {
                                is: {
                                    type: 'any',
                                    flags: {
                                        only: true,
                                        presence: 'required'
                                    },
                                    allow: [{
                                            override: true
                                        },
                                        6
                                    ]
                                },
                                then: {
                                    type: 'number',
                                    flags: {
                                        'default': 6
                                    }
                                },
                                otherwise: {
                                    type: 'number',
                                    flags: {
                                        'default': 7
                                    }
                                }
                            }
                        ]
                    }]
                },
                nestedWhen: {
                    type: 'any',
                    whens: [{
                        ref: {
                            path: [
                                'whenRef'
                            ]
                        },
                        is: {
                            type: 'any',
                            flags: {
                                only: true,
                                presence: 'required'
                            },
                            allow: [{
                                    override: true
                                },
                                5
                            ]
                        },
                        then: {
                            type: 'any',
                            whens: [{
                                ref: {
                                    path: [
                                        'whenRef'
                                    ]
                                },
                                is: {
                                    type: 'any',
                                    flags: {
                                        only: true,
                                        presence: 'required'
                                    },
                                    allow: [{
                                            override: true
                                        },
                                        5
                                    ]
                                },
                                then: {
                                    type: 'number',
                                    flags: {
                                        'default': 5
                                    }
                                },
                                otherwise: {
                                    type: 'number',
                                    flags: {
                                        'default': 7
                                    }
                                }
                            }]
                        },
                        otherwise: {
                            type: 'any',
                            whens: [{
                                ref: {
                                    path: [
                                        'whenRef'
                                    ]
                                },
                                is: {
                                    type: 'any',
                                    flags: {
                                        only: true,
                                        presence: 'required'
                                    },
                                    allow: [{
                                            override: true
                                        },
                                        5
                                    ]
                                },
                                then: {
                                    type: 'number',
                                    flags: {
                                        'default': 5
                                    }
                                },
                                otherwise: {
                                    type: 'number',
                                    flags: {
                                        'default': 7
                                    }
                                }
                            }]
                        }
                    }]
                },
                nestedWhenSwitch: {
                    type: 'any',
                    whens: [{
                        ref: {
                            path: [
                                'whenRef'
                            ]
                        },
                        'switch': [{
                                is: {
                                    type: 'any',
                                    flags: {
                                        only: true,
                                        presence: 'required'
                                    },
                                    allow: [{
                                            override: true
                                        },
                                        5
                                    ]
                                },
                                then: {
                                    type: 'any',
                                    whens: [{
                                        ref: {
                                            path: [
                                                'whenRef'
                                            ]
                                        },
                                        'switch': [{
                                                is: {
                                                    type: 'any',
                                                    flags: {
                                                        only: true,
                                                        presence: 'required'
                                                    },
                                                    allow: [{
                                                            override: true
                                                        },
                                                        5
                                                    ]
                                                },
                                                then: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 5
                                                    }
                                                }
                                            },
                                            {
                                                is: {
                                                    type: 'any',
                                                    flags: {
                                                        only: true,
                                                        presence: 'required'
                                                    },
                                                    allow: [{
                                                            override: true
                                                        },
                                                        6
                                                    ]
                                                },
                                                then: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 6
                                                    }
                                                },
                                                otherwise: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 7
                                                    }
                                                }
                                            }
                                        ]
                                    }]
                                }
                            },
                            {
                                is: {
                                    type: 'any',
                                    flags: {
                                        only: true,
                                        presence: 'required'
                                    },
                                    allow: [{
                                            override: true
                                        },
                                        6
                                    ]
                                },
                                then: {
                                    type: 'any',
                                    whens: [{
                                        ref: {
                                            path: [
                                                'whenRef'
                                            ]
                                        },
                                        'switch': [{
                                                is: {
                                                    type: 'any',
                                                    flags: {
                                                        only: true,
                                                        presence: 'required'
                                                    },
                                                    allow: [{
                                                            override: true
                                                        },
                                                        5
                                                    ]
                                                },
                                                then: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 5
                                                    }
                                                }
                                            },
                                            {
                                                is: {
                                                    type: 'any',
                                                    flags: {
                                                        only: true,
                                                        presence: 'required'
                                                    },
                                                    allow: [{
                                                            override: true
                                                        },
                                                        6
                                                    ]
                                                },
                                                then: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 6
                                                    }
                                                },
                                                otherwise: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 7
                                                    }
                                                }
                                            }
                                        ]
                                    }]
                                },
                                otherwise: {
                                    type: 'any',
                                    whens: [{
                                        ref: {
                                            path: [
                                                'whenRef'
                                            ]
                                        },
                                        'switch': [{
                                                is: {
                                                    type: 'any',
                                                    flags: {
                                                        only: true,
                                                        presence: 'required'
                                                    },
                                                    allow: [{
                                                            override: true
                                                        },
                                                        5
                                                    ]
                                                },
                                                then: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 5
                                                    }
                                                }
                                            },
                                            {
                                                is: {
                                                    type: 'any',
                                                    flags: {
                                                        only: true,
                                                        presence: 'required'
                                                    },
                                                    allow: [{
                                                            override: true
                                                        },
                                                        6
                                                    ]
                                                },
                                                then: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 6
                                                    }
                                                },
                                                otherwise: {
                                                    type: 'number',
                                                    flags: {
                                                        'default': 7
                                                    }
                                                }
                                            }
                                        ]
                                    }]
                                }
                            }
                        ]
                    }]
                }
            }
        });
    });
});