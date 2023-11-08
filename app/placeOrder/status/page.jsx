'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation';
import {useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

//ASIGNA EL PAGO A LOS CARROS CREADOS OJO NO FIFERENCIA CANTIDADES DE UN MISMO PRODUCTO
const putCart = (id_cart ,payment_id) =>{
  console.log(payment_id)
  fetch(`/cart/many`,{
    method: "PUT",
    body: JSON.stringify({
      id_cart: id_cart,
      payment_id: payment_id
    }),
    headers: {
      "content-type": "application/json",
    },
    })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
}

const postCart = (idClient ,idProduct ,payment_id ) =>{
  console.log(payment_id)
  fetch(`/cart/api`, {
    method: "POST",
    body: JSON.stringify({
      idClient,
      idProduct,
      payment_id,
    }),
  })
}


function Succesful() {
  const { data: session } = useSession();
  const [email , setEmail] = useState()
  const searchParams = useSearchParams() ;
  const payment_id = searchParams.get("payment_id");

useEffect(()=>{

  if (localStorage.getItem("email") ) {
    setEmail(localStorage.getItem("email"));
    fetch(
      `/client/form/login/api/email?email=${localStorage.getItem("email")}`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log("esto",r.client[0].id)
        if(localStorage.getItem("_idProduct")){
          postCart(r.client[0].id , localStorage.getItem("_idProduct"), payment_id);
        }else{putCart(localStorage.getItem("id_cart"), payment_id);}
      
      })
  } 
  else if (session ) {
    setEmail(session.user.email);
   fetch(`/client/form/login/api/email?email=${session.user.email}`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if(localStorage.getItem("_idProduct")){
          postCart(r.client[0].id , localStorage.getItem("_idProduct"), payment_id);
        }else{putCart(localStorage.getItem("id_cart"), payment_id);}
      });
  } 
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