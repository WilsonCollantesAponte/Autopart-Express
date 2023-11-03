import { useState } from "react";
import { MoonLoader } from "react-spinners";

export default function AddToCartButton({ idClient, idProduct, mustBeLogged }) {
  const [loadingAddToCart, setloadingAddToCart] = useState(false);
  // const [idClient, setIdClient] = useState("");

  function handleAddToCart() {
    // useEffect(() => {
    //   if (localStorage.getItem("email")) {
    //     fetch(
    //       `/client/form/login/api/email?email=${localStorage.getItem("email")}`
    //     )
    //       .then((r) => r.json())
    //       .then((r) => setIdClient(r.client[0].id));
    //   } else if (session) {
    //     fetch(`/client/form/login/api/email?email=${session.user.email}`)
    //       .then((r) => r.json())
    //       .then((r) => {
    //         console.log(r);
    //         setIdClient(r.client[0].id);
    //       });
    //   } else {
    //     // alert("must be logged");
    //     setMustBeLogged(true);
    //   }
    // });

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

  return (
    <div>
      {!loadingAddToCart ? (
        <button
          onClick={handleAddToCart}
          className="text-red-botton border-2 border-red-botton hover:bg-red-botton hover:text-white font-medium rounded-lg text-sm px-5 py-2 text-center"
        >
          Añadir al carrito
        </button>
      ) : (
        <MoonLoader size={22} />
      )}
    </div>
  );
}
