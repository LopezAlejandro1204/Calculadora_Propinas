///--------2

import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder (){
    //Aqui se usa GENERIC que permite inferir en los datos que recibe como estructura
    const [order, setOrder] = useState<OrderItem[]>([])

    //-----State de la propina
    const [tip, setTip] = useState(0)

    const addItem = (item : MenuItem) => {
        //Para ver si ya existe un elemento
        const itemExist = order.find(orderItem => orderItem.id === item.id)
        if(itemExist){
            //Ya sabe que existe pero ahora la idea es encontrar cual es el elemento repetido y con map retorna un arreglo nuevo
            const updatedOrder = order.map(orderItem => orderItem.id === item.id ? 
                {...orderItem, quantity: orderItem.quantity + 1} //Toma una copia de lo que ya tenemos y le agrega en la cantidad en 1
                : orderItem) // Esto devuelve lo mismo
            
            setOrder(updatedOrder)
        }else{
            const newItem : OrderItem = {...item, quantity: 1} //Le pasas el type y se indica que el item mas la cantidad
            setOrder([...order, newItem])//agarra una cipa y se agrega sobre eso el newitem
        }
    }

    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0) 
    } 

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}