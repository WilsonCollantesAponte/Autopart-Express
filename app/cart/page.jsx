"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Cart() {
  const [productsInTheCart, setProductsInTheCart] = useState([]);
  //   const [emailClient, setEmailClient] = useState("");
  const [mustBeLogged, setMustBeLogged] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (localStorage.getItem("email")) {
      console.log(localStorage.getItem("email"));

      fetch(`/cart/api?email=${localStorage.getItem("email")}`)
        .then((r) => r.json())
        .then((r) => setProductsInTheCart(r))
        .then(() => setisLoading(false));
    } else if (session) {
      console.log(session.user.email);

      fetch(`/cart/api?email=${session.user.email}`)
        .then((r) => r.json())
        .then((r) => setProductsInTheCart(r))
        .then(() => setisLoading(false));
    } else {
      setMustBeLogged(true);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (mustBeLogged) return <div>Must ber Logged</div>;

  return (
    <main>
      {productsInTheCart.map((value, index) => (
        <div key={index}>
          <img src={value.Product.image} alt="image" />
        </div>
      ))}
    </main>
  );
}
