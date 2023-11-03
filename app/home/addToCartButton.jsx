"use client";

import { useState } from "react";
import { MoonLoader } from "react-spinners";

export default function AddToCartButton({ idClient, idProduct, mustBeLogged }) {
  const [loadingAddToCart, setloadingAddToCart] = useState(false);

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
        .then(() => setloadingAddToCart(false))
        .catch(() => setloadingAddToCart(false));
    } else {
      alert("must be logged");
    }
  }

  return (
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
  );
}
