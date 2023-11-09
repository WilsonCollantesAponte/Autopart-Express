"use client";

import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

export default function AddToCartButton({
  idClient,
  idProduct,
  mustBeLogged,
  inCart,
  Cart,
}) {
  const [inTheCart, setInTheCart] = useState(inCart);
  const [statusAux , setStatusAux] = useState()
  const [loadingAddToCart, setloadingAddToCart] = useState(false);
  const [loadDeleteFromTheCart, setLoadDeleteFromTheCart] = useState(false);
  

/*   function handleAddToCart() {
    if (!mustBeLogged) {
      if (!inTheCart || (inTheCart && !statusAux)) { 
        setloadingAddToCart(true);
        fetch(`/cart/api`, {
          method: "POST",
          body: JSON.stringify({
            idClient,
            idProduct,
          }),
        })
          .then((r) => r.json())
          .then(() => setloadingAddToCart(false))
          .then(() => setInTheCart(1))
          .catch(() => setloadingAddToCart(false));
      } else {
        setLoadDeleteFromTheCart(true);
        fetch(`/home/api?idClient=${idClient}&idProduct=${idProduct}`)
          .then((r) => r.json())
          .then((r) => {
            console.log(r)
            fetch(`/cart/api?id=${r[r.length-1].id}`, {
              method: "DELETE",
            })
              .then(() => setInTheCart(0))
              .then(() => setLoadDeleteFromTheCart(false));
          });
      }
    } else {
      alert("must be logged");
    }
  }
 */
  function handleAddToCart() {
    if (!mustBeLogged) {
        setloadingAddToCart(true);
        fetch(`/cart/api`, {
          method: "POST",
          body: JSON.stringify({
            idClient,
            idProduct,
          }),
        })
          .then((r) => r.json())
          .then(() => setloadingAddToCart(false))
          .then(() => {
            setInTheCart(1)
            setStatusAux(true)
            })
          .catch(() => setloadingAddToCart(false));
      }
      else{
        alert("must be logged");
      }
    }


 function handleDeleteToCart() {
  if (!mustBeLogged) {
    setLoadDeleteFromTheCart(true);
    fetch(`/home/api?idClient=${idClient}&idProduct=${idProduct}`)
      .then((r) => r.json())
      .then((r) => {
        if(!r.length == 0){
          fetch(`/cart/api?id=${r[r.length-1].id}`, {
            method: "DELETE",
          })
          .then(() => {if(Cart.length == 0) setInTheCart(0)})
          .then(() => setLoadDeleteFromTheCart(false));
        }else{
          alert("ya se quito el elento del carrito")
        }
      }); 
  }else {
      alert("must be logged");
    }
 }
useEffect(()=>{
  if(Cart.length == 0){
    setStatusAux(true)
  }else{
    const filterAux = Cart.some(elemento => elemento.status === true)
    setStatusAux(filterAux)
  }
  console.log(statusAux)
},[])
  
  return (
    <div>
      {!inTheCart  ? (
        <div>
          {!loadingAddToCart ? (
            <button
              onClick={handleAddToCart}
              className="button mx-2 text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Añadir al carrito
            </button>
          ) : (
            <MoonLoader size={22} />
          )}
        </div>
      ) : (
        <div>
          { !statusAux ? (
          <div>
          {!loadingAddToCart ? (
            <button
              onClick={handleAddToCart}
              className="button mx-2 text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Añadir al carrito
            </button>
          ) : (
            <MoonLoader size={22} />
          )}
        </div>
           
        ):(
          <div>
          {!loadDeleteFromTheCart ? (
            <button
              className="button mx-2 text-black border-2 border-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleDeleteToCart}
            >
              Quitar del carrito
            </button>
          ) : (
            <MoonLoader size={22} />
          )}
        </div>
        )}
        </div>
      )}
    </div>
  );
}
