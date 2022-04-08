import app from '../app'
import { ProductController } from "../controllers"

const controller = new ProductController()

/**
 * @openapi
 * "/categories/{parentId}": {
       *       "get": {
       *             "tags": [
       *                   "categories"
       *             ],
       *             "summary": "Fetch the categories using parentId.",
       *             "description": "Provide a parentId to fetch its categories, if parentId is not provided then get all categories.",
       *             "consumes": [
       *                   "application/json"
       *             ],
       *             "produces": [
       *                   "application/json"
       *             ],
       *             "parameters": [
       *                   {
       *                         "name": "parentId",
       *                         "in": "path",
       *                         "description": "parentId is not required for fetching categories.",
       *                         "required": false,
       *                         "type": "string"
       *                   }
       *             ],
       *             "responses": {
       *                   "200": {
       *                         "description": "success",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/CategoriesViewModel"
       *                                     }
       *                               }
       *                         }
       *                   },
       *                   "400": {
       *                         "description": "failure",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ErrorResponseModel"
       *                                     }
       *                               }
       *                         }
       *                   }
       *             }
       *       }
       * }
 */
app.get('/categories/:parentId?', controller.getCategories);

/**
 * @openapi
 * "/products/{state}": {
       *       "get": {
       *             "tags": [
       *                   "products"
       *             ],
       *             "summary": "Fetch the products using state.",
       *             "description": "Provide a state to fetch the products that are in the given state, if state is not provided then get all products.",
       *             "consumes": [
       *                   "application/json"
       *             ],
       *             "produces": [
       *                   "application/json"
       *             ],
       *             "parameters": [
       *                   {
       *                         "name": "state",
       *                         "in": "path",
       *                         "description": "state is not required for fetching products.",
       *                         "required": false,
       *                         "type": "string"
       *                   }
       *             ],
       *             "responses": {
       *                   "200": {
       *                         "description": "success",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ProductsViewModel"
       *                                     }
       *                               }
       *                         }
       *                   },
       *                   "400": {
       *                         "description": "failure",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ErrorResponseModel"
       *                                     }
       *                               }
       *                         }
       *                   }
       *             }
       *       }
       * }
 */
 app.get('/products/:state?', controller.getProducts);

/**
 * @openapi
 * "/products/{productId}}/{updatedState}": {
       *       "put": {
       *             "tags": [
       *                   "transfer state"
       *             ],
       *             "summary": "transfer the state of given product to the updated given updatedState",
       *             "description": "Get product with given product id and transfer the state of that product to the given updated state",
       *             "consumes": [
       *                   "application/json"
       *             ],
       *             "produces": [
       *                   "application/json"
       *             ],
       *             "parameters": [
       *                   {
       *                         "name": "productId",
       *                         "in": "path",
       *                         "description": "productId is required for fetching product.",
       *                         "required": true,
       *                         "type": "string"
       *                   },
       *                   {
       *                         "name": "updatedState",
       *                         "in": "path",
       *                         "description": "updatedState is required to transfer the state.",
       *                         "required": true,
       *                         "type": "string"
       *                   }
       *             ],
       *             "responses": {
       *                   "200": {
       *                         "description": "success",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ProductModel"
       *                                     }
       *                               }
       *                         }
       *                   },
       *                   "400": {
       *                         "description": "failure",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ErrorResponseModel"
       *                                     }
       *                               }
       *                         }
       *                   }
       *             }
       *       }
       * }
 */
app.put('/products/:productId/:updatedState', controller.transferState);