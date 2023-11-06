'use client'
import React from 'react'
import Link from 'next/link';
import { useEffect , useState } from 'react';



const modificaProducto = (producto) => {
  const productoModificado = producto.map(pro => {
    return {
      id: pro?.id,     
      name: pro?.name,
      price: Number(pro?.price),
      availability: pro?.availability,
      brand: pro?.brand,
      model: pro?.model,
      rating: pro?.rating,
      image: pro?.image, 
      quantity: 1
    }
  })
  return productoModificado;
}
const Botonmercado = ({cantidad , producto}) => {

  const [url,setUrl] = useState()
  const [productosComprar , setProductosComprar] = useState([])

  useEffect(()=>{
    
    console.log("boton",producto)
    const productoModificado = producto.map(pro => {
      return {
        id: pro?.id,     
        name: pro?.name,
        price: Number(pro?.price),
        availability: pro?.availability,
        brand: pro?.brand,
        model: pro?.model,
        rating: pro?.rating,
        image: pro?.image, 
        quantity: 1
      }
    })
    console.log("envia post",productoModificado)
    const getURL= ()=>{
       
              fetch("/placeOrder/checkout",{
                method: "POST",
                body: JSON.stringify(productoModificado),
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((r) => r.json( ))
              .then((r) => r.url)
              .then(
                (r) =>{
                    setUrl(r)
                }
              )
              .catch ((error) =>
            console.log(error.message)
            )
        
    }
    
      getURL();
    
},[])
  return (
    <div>
        <button onClick={() => {localStorage.setItem("_idProducto", producto.id ); console.log(producto.id)}} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            <Link href={`${url}`}>comprar</Link>
        </button>
    </div>
  )
}

export default Botonmercado;