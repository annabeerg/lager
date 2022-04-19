export default interface OrderItems {
    id: number,
    amount: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: string,
    stock: number,
    location: string,
    price: number
};