export default interface Invoice {
    id: number,
    order_id: string,
    total_price: number,
    creation_date: string,
    due_date: string,
}