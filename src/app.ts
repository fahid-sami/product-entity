import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerDefinition from './swaggerDefinition'
import { graphqlHTTP }  from 'express-graphql';
import { schema } from './schema/schema';
import { resolver } from './schema/resolver';

class App {
    public app: express.Application = express();

    constructor() {
        this.app.use(express.json())
        this.app.use(compression())
        this.app.use(helmet({contentSecurityPolicy: false}))
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(
            '/graphql',
            graphqlHTTP((request, response, graphQLParams) => ({
              schema: schema,
              rootValue: resolver,
              graphiql: true,
              context: {
                request,
                response,
            }
            }))
        );

        const options = {
            definition: swaggerDefinition,
            apis: ['**/*.ts']
        }

        const swaggerDocument = swaggerJsdoc(options)
        this.app.use('/api-docs', express.static('node_modules/swagger-ui-dist/', { index: false }),
            swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
                swaggerOptions: {
                    filter: true
                }
            }))
    }
}

const app = new App().app
export default app
