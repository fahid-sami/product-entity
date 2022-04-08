import { ProductService } from "../services";

const service = new ProductService();

export const  resolver = { 
    products: async params => await service.getProducts(params.state),
    categories: async params => await service.getCategories(params.parentId),
    transferState: async params => await service.transferState(params.productId, params.updatedState)
};