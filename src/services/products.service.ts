import { Product, Catrgory } from "../models";
import { products, categories } from '../test/mocks/mock-data';
import { ProductState } from './state.service'

export class ProductService {
    private productState = new ProductState();
    private products: Product[]; // Used to store products in memory
    private categories: Catrgory[]; // Used to store categories in memory

    constructor() {
        this.products = products;
        this.categories = categories;
    }

    getCategories(parentId: string): Promise<Catrgory[]> {
        return new Promise((resolve, reject) => {
            parentId ? resolve(this.categories.filter(category => category.parentId === parentId)) : resolve(this.categories.map(category => category));
        });
    }

    getProducts(state: string): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            state ? resolve(this.products.filter(product => product.state === state)) : resolve(this.products.map(product => product));
        });
    }

    transferState(productId: string, updatedState: string): Promise<Product> {
        return new Promise((resolve, reject) => {
            const product = this.products.find(product => product.id === productId);
            if (!product) {
                reject('Invalid product id');
            } else {
                const stateChange = this.productState.change(product.state, updatedState);
                if (stateChange === ProductState.INVALID_STATE) {
                    reject(ProductState.INVALID_STATE);
                } else {
                    product.state = stateChange;
                    resolve(product);
                }
            }
        });
    }
}