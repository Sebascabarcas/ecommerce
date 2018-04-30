export interface Product {
    id: number,
    name: string,
    description: string,
    category: number,
    shipping_description: string,
    origin_id: number,
    user_id: number,
    stock: number, 
    price: number,
    is_used: boolean,
    is_auction: boolean
}