'use client'

import React, { useEffect, useState } from "react";

export default function Cart() {
  // Obtenemos el carrito almacenado en el Local Storage
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(storedCart);
  const [itemCount, setItemCount] = useState(0);

  // Función para eliminar un producto del carrito por posición
  const removeProductFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Elimina el elemento en la posición index
    
    // Actualizamos el carrito en el estado local
    setCart(updatedCart);

    // Actualizamos el carrito en el Local Storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  useEffect(() => {
    const itemCount = cart.reduce((total, product) =>{
        setItemCount(itemCount)
    })
    }, [cart]);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((product, index) => (
          <li key={product.id}>
            {product.name} - {product.price} <img
                    src={product?.image}
                    alt=""
                    width={250}
                />
            <button
              onClick={() => removeProductFromCart(index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}