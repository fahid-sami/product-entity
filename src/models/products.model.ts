
// Currnetly there is no database connected.
// Using interfaces as model schemas.

export type states = "Draft" | "Available" | "Expired" | "Deleted draft" | "Deleted" | "Reserved" | "Sold" | "Returned" | "Listing deleted";

export interface Product {
    id: string;
    name: string;
    price: number;
    state: states;
    categoryId: string;     // that would be a foreign key in a traditional database system for the Category table
}

export interface Catrgory {
    id: string;
    name: string;
    parentId: string;       // that would be a foreign key in a traditional database system for the Category table
}

export interface Image {
    id: string;
    s3Path: string;
    isMain: boolean;
    productId: string     // that would be a foreign key in a traditional database system for the Product table
}