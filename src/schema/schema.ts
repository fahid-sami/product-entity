const { buildSchema } = require('graphql');

export const schema = buildSchema(`
    type Query {
        products(state: String): [Product]
        categories(parentId: String): [Category]
        transferState(productId: String!, updatedState: String!): Product
    }
    type Product {
        id: String!
        name: String!
        price: Int!
        state: String!
        categoryId: String!
    }
    type Category {
        id: String!
        name: String!
        parentId: String
    }
`);