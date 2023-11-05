'use client'
import React from 'react'
import Link from 'next/link';
import { useEffect , useState } from 'react';
const Botonmercado = ({cantidad , producto}) => {

  const [url,setUrl] = useState()

  useEffect(()=>{
    
    console.log(producto?.price)
    const getURL= ()=>{
       
              fetch("/placeOrder/checkout",{
                method: "POST",
                body: JSON.stringify([
                  {
                  id: producto?.id,     
                  name: producto?.name,
                  price: Number(producto?.price),
                  availability: producto?.availability,
                  brand: producto?.brand,
                  model: producto?.model,
                  rating: producto?.rating,
                  image: producto?.image, 
                  quantity: 1
                  }
                ]),
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
            <Link href={`${url}`}>comprar {cantidad}</Link>
        </button>
    </div>
  )
}

export default Botonmercado;