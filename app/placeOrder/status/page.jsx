'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

function Succesful() {
    const searchParams = useSearchParams()  
//debe enviar payment_id al PUT end point  /placeOrder/notify para asignarlo al cliente
  return (
    //si el status es approved
// muestra los productos de la compra recien realizada y el pago  debe realizar peticion al end point get placeOrder/carrito
// enviarle params de email ya sea google o login
    // si el status es failed - mostrar un catel de compra fallida
    // si el status es pending - mostrar un cartel de pago pendiente 
    <div>Succesful</div>
  )
}

export default Succesful