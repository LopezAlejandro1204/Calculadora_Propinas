import { useMemo} from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps ={
    order: OrderItem[],
    tip: number,
    placeOrder : () => void 
}
export default function OrderTotals({order, tip, placeOrder}: OrderTotalsProps) {

    //Use memo solo funciona cuando cambia la dependencia
    const subtotalAmount = useMemo(()=> order.reduce((total, item)=> total + (item.quantity * item.price), 0), [order])

    /** 
     * Se debe ejecutar cuando [] - cambie la propina o la orden
     * () => es el calculo del sub total y de la propina
    */
    const tipAmount = useMemo(() => subtotalAmount*tip, [tip, order])

    //----Para el TOTAL
    const totalAmount = useMemo(() => subtotalAmount*tipAmount, [tip, order])

    return (
        <>
            <div className="space y-3">
                <h2 className="font-black text-2xl">
                    Totales y Propina:
                </h2>
                <p>
                    Subtotal a pagar: {''}
                    <span className=" font-bold">{formatCurrency(subtotalAmount)}</span>
                </p>
                <p>
                    Propina: {''}
                    <span className=" font-bold">{formatCurrency(tipAmount)}</span>
                </p>
                <p>
                    Total a pagar: {''}
                    <span className=" font-bold">{formatCurrency(totalAmount)}</span>
                </p>
            </div>
            <button 
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                disabled={totalAmount === 0 }
                onClick={placeOrder}
            >
                Guardar Orden
            </button>
        </>
    )
}
