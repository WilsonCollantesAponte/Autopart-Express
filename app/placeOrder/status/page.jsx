'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation';
import {useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const postCart = (idClient , idProduct ,payment_id) =>{
  fetch(`/cart/api`,{
    method: "POST",
    body: JSON.stringify({
      idClient: idClient,
      idProduct: idProduct,
      payment_id: payment_id
    }),
    headers: {
      "content-type": "application/json",
    },
    })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    console.log([idClient , idProduct , payment_id])
}

function Succesful() {
  const { data: session } = useSession();
  const [idClient, setIdClient] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [email , setEmail] = useState()
  const searchParams = useSearchParams() ;
  const payment_id = searchParams.get("payment_id");

    
//debe enviar payment_id al PUT end point  /placeOrder/notify para asignarlo al cliente


useEffect(()=>{

  if (localStorage.getItem("email") || session) {
    setEmail(localStorage.getItem("email"));
    //setIdProduct(localStorage.getItem("_idProducto"));
    fetch(
      `/client/form/login/api/email?email=${localStorage.getItem("email")}`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r)
        setIdClient(r.client[0].id)
        postCart(r.client[0].id,localStorage.getItem("_idProducto"), payment_id);
      })
  } 
 /*  else if (session && !localStorage.getItem("email")) {
    setEmail(session.user.email);
    //setIdProduct(localStorage.getItem("_idProducto"));
    fetch(`/client/form/login/api/email?email=${session.user.email}`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setIdClient(r.client[0].id);
        postCart(r.client[0].id,localStorage.getItem("_idProducto"), payment_id);
      });
  } else {console.log("cliente?")} */
},[])


 
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
         <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
         {
          email? (
            <div>
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">compra exitosa. Gracias!! {email}</h1>
              <p>pago asociado {payment_id}</p>
            </div>
          ):(
            <p>loading...</p>
          )
         }
          
          </div>
          <Link href='/home'>
            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              seguir comprando
            </button>
          </Link>
         </div>   
      </section>
    
    </div>
  )
}

export default Succesful