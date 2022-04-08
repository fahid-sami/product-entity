import { expect } from 'chai'
import request from 'supertest';
import { ProductState } from '../../services/state.service';
import { categories, products } from '../mocks/mock-data'

describe("Product Entity APIs - Integration Tests", () => {
    let server;

    before(async () => {
        const mod = await import('../../index');
        server = (mod as any).default;
    });
    after((done) => {
        if (server) {
            server.close(done);
        }
    });

    it('get /categories/:parentId? - Fetch the categories if parentId is undefined', async () => {
        const res = await request(server)
            .get('/categories/')
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    })

    it('get /categories/:parentId? - Fetch the categories using parentId', async () => {
        const res = await request(server)
            .get('/categories/' + categories[2])
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    })

    it('get /products/:state? - Fetch the products if state is undefined', async () => {
        const res = await request(server)
            .get('/products/')
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    })

    it('get /products/:state? - Fetch the products using state', async () => {
        const res = await request(server)
            .get('/products/' + ProductState.DRAFT_STATE)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    })

    // Test cases to cover State Transfer request when current state is Draft

    it('PUT /products/:productId/:updatedState - throw error when product is in Draft state and updated state is Deleted', async () => {
        const res = await request(server)
            .put(`/products/${products[0].id}/${ProductState.DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Draft state and updated state is Expired', async () => {
        const res = await request(server)
            .put(`/products/${products[0].id}/${ProductState.EXPIRED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Draft state and updated state is Reserved', async () => {
        const res = await request(server)
            .put(`/products/${products[0].id}/${ProductState.RESERVED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Draft state and updated state is Sold', async () => {
        const res = await request(server)
            .put(`/products/${products[0].id}/${ProductState.SOLD_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Draft state and updated state is Returned', async () => {
        const res = await request(server)
            .put(`/products/${products[0].id}/${ProductState.RETURNED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Draft state and updated state is invalid', async () => {
        const res = await request(server)
            .put(`/products/${products[0].id}/${ProductState.INVALID_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Draft state to Available state.', async () => {
        const res = await request(server)
            .put(`/products/${products[0].id}/${ProductState.AVAILABLE_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body).to.haveOwnProperty('name');
        expect(res.body).to.haveOwnProperty('price');
        expect(res.body).to.haveOwnProperty('state');
        expect(res.body).to.haveOwnProperty('categoryId');
        expect(res.body.state).to.equal(ProductState.AVAILABLE_STATE);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Draft state to Deleted draft state', async () => {
        const res = await request(server)
            .put(`/products/${products[2].id}/${ProductState.DELETED_DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.DELETED_DRAFT_STATE);
    })

    // Test cases to cover State Transfer request when current state is Available

    it('PUT /products/:productId/:updatedState - throw error when product is in Available state and updated state is Deleted draft', async () => {
        const res = await request(server)
            .put(`/products/${products[1].id}/${ProductState.DELETED_DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Available state and updated state is Draft', async () => {
        const res = await request(server)
            .put(`/products/${products[1].id}/${ProductState.DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Available state and updated state is Sold', async () => {
        const res = await request(server)
            .put(`/products/${products[1].id}/${ProductState.SOLD_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Available state and updated state is Returned', async () => {
        const res = await request(server)
            .put(`/products/${products[1].id}/${ProductState.RETURNED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Available state and updated state is invalid', async () => {
        const res = await request(server)
            .put(`/products/${products[1].id}/${ProductState.INVALID_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Available state to Expired state.', async () => {
        const res = await request(server)
            .put(`/products/${products[1].id}/${ProductState.EXPIRED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.body.state).to.equal(ProductState.EXPIRED_STATE);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Available state to Deleted state', async () => {
        const res = await request(server)
            .put(`/products/${products[3].id}/${ProductState.DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.DELETED_STATE);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Available state to Reserved state', async () => {
        const res = await request(server)
            .put(`/products/${products[15].id}/${ProductState.RESERVED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.RESERVED_STATE);
    })

    // Test cases to cover State Transfer request when current state is Deleted draft

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted Draft state and updated state is Deleted', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted Draft state and updated state is Expired', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.EXPIRED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted Draft state and updated state is Reserved', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.RESERVED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted Draft state and updated state is Sold', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.SOLD_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted Draft state and updated state is Returned', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.RETURNED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted Draft state and updated state is invalid', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.INVALID_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted Draft state and updated state is Available', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.AVAILABLE_STATE}`)
            .set('Accept', 'application/json')
            .send();
            expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted Draft state and updated state is Draft', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
            expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Deleted Draft state to Listing deleted state', async () => {
        const res = await request(server)
            .put(`/products/${products[5].id}/${ProductState.LISTING_DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.LISTING_DELETED_STATE);
    })

    // Test cases to cover State Transfer request when current state is Expired

    it('PUT /products/:productId/:updatedState - throw error when product is in Expired state and updated state is Deleted', async () => {
        const res = await request(server)
            .put(`/products/${products[4].id}/${ProductState.DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Expired state and updated state is Reserved', async () => {
        const res = await request(server)
            .put(`/products/${products[4].id}/${ProductState.RESERVED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Expired state and updated state is Sold', async () => {
        const res = await request(server)
            .put(`/products/${products[4].id}/${ProductState.SOLD_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Expired state and updated state is Returned', async () => {
        const res = await request(server)
            .put(`/products/${products[4].id}/${ProductState.RETURNED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Expired state and updated state is invalid', async () => {
        const res = await request(server)
            .put(`/products/${products[4].id}/${ProductState.INVALID_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Expired state and updated state is Draft', async () => {
        const res = await request(server)
            .put(`/products/${products[4].id}/${ProductState.DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Expired state to Listing Available state', async () => {
        const res = await request(server)
            .put(`/products/${products[4].id}/${ProductState.AVAILABLE_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.AVAILABLE_STATE);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Expired state to Listing deleted state', async () => {
        const res = await request(server)
            .put(`/products/${products[6].id}/${ProductState.LISTING_DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.LISTING_DELETED_STATE);
    })

    // Test cases to cover State Transfer request when current state is Deleted

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted state and updated state is Deleted draft', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.DELETED_DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted state and updated state is Expired', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.EXPIRED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted state and updated state is Reserved', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.RESERVED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted state and updated state is Sold', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.SOLD_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted state and updated state is Returned', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.RETURNED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted state and updated state is invalid', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.INVALID_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted state and updated state is Available', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.AVAILABLE_STATE}`)
            .set('Accept', 'application/json')
            .send();
            expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Deleted state and updated state is Draft', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
            expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Deleted state to Listing deleted state', async () => {
        const res = await request(server)
            .put(`/products/${products[8].id}/${ProductState.LISTING_DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.LISTING_DELETED_STATE);
    })

    // Test cases to cover State Transfer request when current state is Sold

    it('PUT /products/:productId/:updatedState - throw error when product is in Sold state and updated state is Deleted', async () => {
        const res = await request(server)
            .put(`/products/${products[13].id}/${ProductState.DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Sold state and updated state is Expired', async () => {
        const res = await request(server)
            .put(`/products/${products[13].id}/${ProductState.EXPIRED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Sold state and updated state is Reserved', async () => {
        const res = await request(server)
            .put(`/products/${products[13].id}/${ProductState.RESERVED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Sold state and updated state is invalid', async () => {
        const res = await request(server)
            .put(`/products/${products[13].id}/${ProductState.INVALID_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Sold state and updated state is Draft', async () => {
        const res = await request(server)
            .put(`/products/${products[13].id}/${ProductState.DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Sold state and updated state is Available', async () => {
        const res = await request(server)
            .put(`/products/${products[13].id}/${ProductState.AVAILABLE_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Sold state to Returned state', async () => {
        const res = await request(server)
            .put(`/products/${products[13].id}/${ProductState.RETURNED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.RETURNED_STATE);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Sold state to Listing deleted state', async () => {
        const res = await request(server)
            .put(`/products/${products[16].id}/${ProductState.LISTING_DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.LISTING_DELETED_STATE);
    })

    // Test cases to cover State Transfer request when current state is Reserved

    it('PUT /products/:productId/:updatedState - throw error when product is in Reserved state and updated state is Deleted', async () => {
        const res = await request(server)
            .put(`/products/${products[11].id}/${ProductState.DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Reserved state and updated state is Expired', async () => {
        const res = await request(server)
            .put(`/products/${products[11].id}/${ProductState.EXPIRED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Reserved state and updated state is Reserved', async () => {
        const res = await request(server)
            .put(`/products/${products[11].id}/${ProductState.RESERVED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Reserved state and updated state is invalid', async () => {
        const res = await request(server)
            .put(`/products/${products[11].id}/${ProductState.INVALID_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Reserved state and updated state is Listing Deleted', async () => {
        const res = await request(server)
            .put(`/products/${products[11].id}/${ProductState.LISTING_DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Reserved state and updated state is Draft', async () => {
        const res = await request(server)
            .put(`/products/${products[11].id}/${ProductState.DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Reserved state and updated state is Returned', async () => {
        const res = await request(server)
            .put(`/products/${products[11].id}/${ProductState.RETURNED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Reserved state to Sold state', async () => {
        const res = await request(server)
            .put(`/products/${products[11].id}/${ProductState.SOLD_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.SOLD_STATE);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Reserved state to Available state', async () => {
        const res = await request(server)
            .put(`/products/${products[9].id}/${ProductState.AVAILABLE_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.AVAILABLE_STATE);
    })

    // Test cases to cover State Transfer request when current state is Returned

    it('PUT /products/:productId/:updatedState - throw error when product is in Returned state and updated state is Available', async () => {
        const res = await request(server)
            .put(`/products/${products[12].id}/${ProductState.AVAILABLE_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Returned state and updated state is Expired', async () => {
        const res = await request(server)
            .put(`/products/${products[12].id}/${ProductState.EXPIRED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Returned state and updated state is Reserved', async () => {
        const res = await request(server)
            .put(`/products/${products[12].id}/${ProductState.RESERVED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Returned state and updated state is invalid', async () => {
        const res = await request(server)
            .put(`/products/${products[12].id}/${ProductState.INVALID_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Returned state and updated state is Listing Deleted', async () => {
        const res = await request(server)
            .put(`/products/${products[12].id}/${ProductState.LISTING_DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Returned state and updated state is Sold', async () => {
        const res = await request(server)
            .put(`/products/${products[12].id}/${ProductState.SOLD_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - throw error when product is in Returned state and updated state is Returned', async () => {
        const res = await request(server)
            .put(`/products/${products[12].id}/${ProductState.RETURNED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(400);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Returned state to Draft state', async () => {
        const res = await request(server)
            .put(`/products/${products[12].id}/${ProductState.DRAFT_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.DRAFT_STATE);
    })

    it('PUT /products/:productId/:updatedState - Transfer the state of product which is in Returned state to Deleted state', async () => {
        const res = await request(server)
            .put(`/products/${products[14].id}/${ProductState.DELETED_STATE}`)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.state).to.equal(ProductState.DELETED_STATE);
    })

})