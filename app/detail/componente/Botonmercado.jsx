'use client'
import React from 'react'
import Link from 'next/link';
import { useEffect , useState } from 'react';

const Botonmercado = ({producto , id_cart }) => {

  const [url,setUrl] = useState()
  
  useEffect(()=>{
    console.log(producto)
     const productoLimpio = producto.filter((pro) => pro?.quantity !== 0)
    
    console.log("envia post",productoLimpio)
    const getURL= ()=>{
       
              fetch("/placeOrder/checkout",{
                method: "POST",
                body: JSON.stringify(productoLimpio),
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
    
},[producto])
  return (
    <div>
        <button onClick={() => { if(Array.isArray(id_cart) ){
                                        localStorage.setItem("id_cart", JSON.stringify(id_cart)); console.log("dentro",id_cart);
                                      }else{
                                        localStorage.setItem("_idProduct", id_cart); console.log(id_cart);
                                      }
                                }} 
          className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            <Link href={`${url}`}>comprar</Link>
        </button>
    </div>
  )
}

export default Botonmercado;