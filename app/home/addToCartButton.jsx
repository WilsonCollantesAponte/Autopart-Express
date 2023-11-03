"use client";

import { useState } from "react";
import { MoonLoader } from "react-spinners";

export default function AddToCartButton({ idClient, idProduct, mustBeLogged }) {
  // const [isLoading, setIsLoading] = useState(true);
  const [loadingAddToCart, setloadingAddToCart] = useState(false);
  // const [idClient, setIdClient] = useState("");

  function handleAddToCart() {
    if (!mustBeLogged) {
      console.log({
        idClient,
        idProduct,
      });
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
      console.log("must be logged");
      alert("must be logged");
    }
  }

  // useEffect(() => {
  //   if (localStorage.getItem("email")) {
  //     fetch(
  //       `/client/form/login/api/email?email=${localStorage.getItem("email")}`
  //     )
  //       .then((r) => r.json())
  //       .then((r) => setIdClient(r.client[0].id))
  //       .then(() => setIsLoading(false));
  //   } else if (session) {
  //     fetch(`/client/form/login/api/email?email=${session.user.email}`)
  //       .then((r) => r.json())
  //       .then((r) => {
  //         console.log(r);
  //         setIdClient(r.client[0].id);
  //       })
  //       .then(() => setIsLoading(false));
  //   } else {
  //     alert("must be logged");
  //     setIsLoading(false);
  //   }
  //   console.log(idClient);
  // }, []);

  // if (isLoading) return <FadeLoader size={22} />;

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
