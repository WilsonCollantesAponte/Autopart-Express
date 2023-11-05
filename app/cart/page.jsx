"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Cart() {
  //   const [e, setE] = useState("");

  const [productsInTheCart, setProductsInTheCart] = useState([]);
  const [mustBeLogged, setMustBeLogged] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (localStorage.getItem("email")) {
      //   setE(localStorage.getItem("email"));
      fetch(`/cart/api?email=${localStorage.getItem("email")}`)
        .then((r) => r.json())
        .then((r) => {
             setProductsInTheCart(r);
             localStorage.setItem("productsInTheCart", JSON.stringify(r));})
        .then(() => setisLoading(false))
        .then(() => setMustBeLogged(false));
    } else if (session) {
      fetch(`/cart/api?email=${session.user.email}`)
        .then((r) => r.json())
        .then((r) => {
            setProductsInTheCart(r);
            localStorage.setItem("productsInTheCart", JSON.stringify(r));})
        .then(() => setisLoading(false))
        .then(() => setMustBeLogged(false));
    } else {
      setisLoading(false);
      //   setMustBeLogged(true);
    }
  }, [session?.user.email]);

  if (isLoading) return <div>Loading...</div>;

  if (mustBeLogged) return <div>Must be Logged</div>;

  return (
    <main className=" flex flex-wrap">
      {productsInTheCart.map((value, index) => (
        <div
          key={index}
          className="shadow-2xl rounded-lg max-w-xs h-fit py-4 flex-col bg-sky-100/40"
        >
          <img src={value.Product.image} alt="image" className=" w-24" />

          <div className="px-5 pb-5">
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
              {value.Product.name}
            </h3>
          </div>
          <div className="px-5 pb-5">
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
              {value.Product.brand}
            </h3>
          </div>
          <div className="px-5 pb-5">
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
              {value.Product.model}
            </h3>
          </div>
        </div>
      ))}
    </main>
  );
}
