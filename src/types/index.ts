//----------3

export type MenuItem = {
    id: number
    name: string
    price: number
}
//Se toma todo lo de MenuItem y se la hereda a OrderItem
export type OrderItem = MenuItem & {
    quantity : number
}