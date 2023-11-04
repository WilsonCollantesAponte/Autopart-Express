"use client";

import { useState } from "react";
import { MoonLoader } from "react-spinners";

export default function AddToCartButton({
  idClient,
  idProduct,
  mustBeLogged,
  inCart,
}) {
  const [inTheCart, setInTheCart] = useState(inCart);
  const [idCart, setIdCart] = useState("");

  const [loadingAddToCart, setloadingAddToCart] = useState(false);
  const [loadDeleteFromTheCart, setLoadDeleteFromTheCart] = useState(false);

  function handleAddToCart() {
    if (!mustBeLogged) {
      if (!inTheCart) {
        setloadingAddToCart(true);
        fetch(`/cart/api`, {
          method: "POST",
          body: JSON.stringify({
            idClient,
            idProduct,
          }),
        })
          .then((r) => r.json())
          .then((r) => {
            // console.log(r);
            // setIdCart(r.id);
          })
          .then(() => setloadingAddToCart(false))
          .then(() => setInTheCart(1))
          .catch(() => setloadingAddToCart(false));
      } else {
        setLoadDeleteFromTheCart(true);
        // console.log("idProduct", idProduct);
        // console.log("idClient", idClient);

        fetch(`/home/api?idClient=${idClient}&idProduct=${idProduct}`)
          .then((r) => r.json())
          .then((r) => {
            fetch(`/cart/api?id=${r[0].id}`, {
              method: "DELETE",
            })
              .then(() => setInTheCart(0))
              .then(() => setLoadDeleteFromTheCart(false));
          });

        // return alert("delete from the cart");
        // console.log(idCart);
        // console.log(typeof idCart);
      }
    } else {
      alert("must be logged");
    }
  }

  // useEffect(() => {}, [inTheCart]);

  return (
    <div>
      {!inTheCart ? (
        <div>
          {!loadingAddToCart ? (
            <button
              onClick={handleAddToCart}
              className="button mx-2 text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Añadir al carrito - export
            </button>
          ) : (
            <MoonLoader size={22} />
          )}
        </div>
      ) : (
        <div>
          {!loadDeleteFromTheCart ? (
            <button
              className="button mx-2 text-black border-2 border-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleAddToCart}
            >
              Quitar del carrito
            </button>
          ) : (
            <MoonLoader size={22} />
          )}
        </div>
      )}
    </div>
  );
}
