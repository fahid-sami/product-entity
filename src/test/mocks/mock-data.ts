import { Catrgory, Product } from "../../models";

export const products: Product[] = [
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
        "name": "Pro1",
        "price": 100,
        "state": "Draft",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001",
        "name": "Pro2",
        "price": 100,
        "state": "Available",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc002",
        "name": "Pro3",
        "price": 100,
        "state": "Draft",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc001"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc003",
        "name": "Pro4",
        "price": 100,
        "state": "Available",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc009"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc004",
        "name": "Pro5",
        "price": 100,
        "state": "Expired",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc001"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc005",
        "name": "Pro6",
        "price": 100,
        "state": "Deleted draft",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc001"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc006",
        "name": "Pro7",
        "price": 100,
        "state": "Expired",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc002"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc007",
        "name": "Pro8",
        "price": 100,
        "state": "Deleted draft",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc002"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc008",
        "name": "Pro9",
        "price": 100,
        "state": "Deleted",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc003"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc009",
        "name": "Pro10",
        "price": 100,
        "state": "Reserved",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc004"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc010",
        "name": "Pro11",
        "price": 100,
        "state": "Deleted",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc005"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc011",
        "name": "Pro12",
        "price": 100,
        "state": "Reserved",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc006"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc012",
        "name": "Pro13",
        "price": 100,
        "state": "Returned",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc007"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc013",
        "name": "Pro14",
        "price": 100,
        "state": "Sold",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc008"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc014",
        "name": "Pro15",
        "price": 100,
        "state": "Returned",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc009"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc015",
        "name": "Pro4",
        "price": 100,
        "state": "Available",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc009"
    },
    {
        "id": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc016",
        "name": "Pro14",
        "price": 100,
        "state": "Sold",
        "categoryId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc008"
    },
];

export const categories: Catrgory[] = [
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
        "name": "Cat1",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc002"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc001",
        "name": "Cat2",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc002"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc002",
        "name": "Cat3",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc004"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc003",
        "name": "Cat4",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc002"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc004",
        "name": "Cat5",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc005"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc005",
        "name": "Cat6",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc004"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc006",
        "name": "Cat7",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc005"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc007",
        "name": "Cat8",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc006"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc008",
        "name": "Cat9",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc006"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc009",
        "name": "Cat10",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc007"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc010",
        "name": "Cat11",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc007"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc011",
        "name": "Cat12",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc008"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc012",
        "name": "Cat13",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc008"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc013",
        "name": "Cat14",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc009"
    },
    {
        "id": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc014",
        "name": "Cat15",
        "parentId": "21bf5b37-e0b8-42e0-8dcf-dc8c4aefc009"
    }
]