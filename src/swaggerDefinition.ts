const url = 'http://localhost:' + process.env.PORT
const desp = 'Product Entity server'

export default {
    openapi: '3.0.0',
    info: {
        title: 'Product Entity APIs',
        version: '1.0.0'
    },
    servers: [
        {
            url: url,
            description: desp
        }],
    securitySchemes: {},
    components: {
        schemas: {
            CategoriesViewModel: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        parentId: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        id: {
                            type: 'string'
                        }
                    }
                }
            },
            ProductsViewModel: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        price: {
                            type: 'number'
                        },
                        state: {
                            type: 'string'
                        },
                        categoryId: {
                            type: 'string'
                        }
                    }
                }
            },
            ProductModel: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    price: {
                        type: 'number'
                    },
                    state: {
                        type: 'string'
                    },
                    categoryId: {
                        type: 'string'
                    }
                }
            },
            ErrorResponseModel: {
                type: 'object',
                properties: {
                    error: {
                        type: 'string'
                    }
                }
            }
        }
    }
}