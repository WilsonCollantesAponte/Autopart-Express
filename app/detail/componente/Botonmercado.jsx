"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

const Botonmercado = ({ producto, id_cart, mustBeLogged }) => {
  const [url, setUrl] = useState();
  const [loadingComprar, setLoadingComprar] = useState(true);

  function handleLogged() {
    alert("Debe iniciar sesión para continuar");
  }

  useEffect(() => {
    const productoLimpio = producto.filter((pro) => pro?.quantity !== 0)
    
    /* productoLimpio.forEach(element => {
      element.price= Number(element.price)
    });
 */
    console.log("envia post", productoLimpio);
    if (productoLimpio.length == 1) {
      localStorage.setItem("_cantidad", productoLimpio[0]?.quantity);
      console.log("cuntti", productoLimpio[0]?.quantity);
    } else {
      const auxQuantity = productoLimpio.map((value) => value.quantity);
      localStorage.setItem("_cantidadvarios", JSON.stringify(auxQuantity));
      console.log("varios", auxQuantity);
    }

    const getURL = () => {
      fetch("/placeOrder/checkout", {
        method: "POST",
        body: JSON.stringify(productoLimpio),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => r.url)
        .then((r) => {
          setUrl(r);
        })
        .then(() => setLoadingComprar(false))
        .catch((error) => console.log(error));
    };

    getURL();
  }, [producto]);

  return (
    <div>
      {mustBeLogged ? (
        <div>
          <button
            onClick={handleLogged}
            className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
          >
            Comprar
          </button>
        </div>
      ) : (
        <div>
          {loadingComprar ? (
            <MoonLoader size={22}></MoonLoader>
          ) : (
            <button
              onClick={() => {
                if (Array.isArray(id_cart)) {
                  localStorage.setItem("id_cart", JSON.stringify(id_cart));
                  console.log("dentro", id_cart);
                  localStorage.setItem("_compra", "muchos");
                } else {
                  localStorage.setItem("_idProduct", id_cart);
                  console.log(id_cart);
                  localStorage.setItem("_compra", "uno");
                }
              }}
              className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              <Link href={`${url}`}>Comprar</Link>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Botonmercado;
