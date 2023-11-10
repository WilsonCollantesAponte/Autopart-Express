"use client";

import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Botonmercado from "../componente/Botonmercado";
import { useSession } from "next-auth/react";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [id_cart, setId_cart] = useState();
  const { data: session } = useSession();
  const [mustBeLogged, setMustBeLogged] = useState(true);
  const [comment, setComment] = useState("");

  const restar = () => {
    setProduct((prevProduct) => {
      const newQuantity = prevProduct.quantity - 1;
      return {
        ...prevProduct,
        quantity: newQuantity > 0 ? newQuantity : 0,
      };
    });
  };

  const sumar = () => {
    setProduct((prevProduct) => {
      const newQuantity = prevProduct.quantity + 1;
      return {
        ...prevProduct,
        quantity: newQuantity > 0 ? newQuantity : 0,
      };
    });
  };

  const handlerQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      setProduct((prevProduct) => {
        const upDateProduct = {
          ...prevProduct,
          quantity: newQuantity,
        };
        return upDateProduct;
      });
    }
  };

  useEffect(() => {
    fetch(`/product/api/${id}`)
      .then((r) => r.json())
      .then((r) => r.product)
      .then((r) => {
        setProduct({
          id: r.id,
          name: r.name,
          price: Number(r.price),
          availability: r.availability,
          brand: r.brand,
          model: r.model,
          rating: r.rating,
          image: r.image,
          quantity: 0,
        });
        setId_cart(r.id);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load");
      });
    if (localStorage.getItem("email") || session) {
      setMustBeLogged(false);
    }
  }, [id]);

  if (isLoading)
    return (
      <div>
        <MoonLoader size={200} className=" mx-auto" />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          {/* <div> */}
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              src={product?.image}
              alt=""
              width={350}
              height={350}
              className="w-350 h-150 object-cover rounded-lg"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-m title-font text-red-font mr-2">
                {product?.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">
                {`${product?.name} | ${product?.model}`}{" "}
              </h1>

              <div className="flex items-center">
                <p className="text-small title-font text-gray-900 mr-2">
                  Rating: {product?.rating}
                </p>
                {Array.from({ length: product?.rating }, (_, index) => (
                  <span key={index} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>

              <span className="title-font text-3xl text-gray-900">
                ${product?.price}
              </span>
              <div className="flex mb-4"></div>
              <p className="leading-relaxed text-gray-600">Caracteristicas</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
              <div className="flex  mb-5">
                <p className="mr-2  text-gray-600">Stock disponible</p>

                <p>{`(${product?.availability} unidades disponibles)`}</p>
              </div>
              <div className="flex flex-row h-10  rounded-lg relative bg-transparent mt-1 mb-5">
                <label className="mr-2">cantidad</label>
                <button
                  onClick={restar}
                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="number"
                  className="outline-none focus:outline-none text-center  w-20 bg-gray-300 font-semibold text-md  focus:text-black  md:text-basecursor-default flex text-gray-700  "
                  name="custom-input-number"
                  value={product?.quantity}
                  onChange={() => handlerQuantity()}
                ></input>
                <button
                  onClick={sumar}
                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>

              <div className="flex ">
                {product?.quantity == 0 ? (
                  <p className="font-medium text-red-700">
                    debe seleccionar al menos un producto
                  </p>
                ) : (
                  <Botonmercado
                    producto={[product]}
                    id_cart={id_cart}
                    mustBeLogged={mustBeLogged}
                  />
                )}
              </div>
            </div>
          </div>
          <div className=" bg-red-400">
            <input
              className=" w-5/6"
              type="text"
              value={comment}
              onChange={(e) => {
                // console.log(e.target.value);
                setComment(e.target.value);
              }}
            />
            <button
              className=" w-1/6"
              onClick={() => {
                fetch(`detail/api`, {
                  method: "PUT",
                  body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    idProduct: product.id,
                    comment,
                  }),
                })
                  .then((r) => r.json())
                  .then((r) => console.log(r));
              }}
            >
              Comentar
            </button>
          </div>
          {/* </div> */}
        </div>
      </section>
    </>
  );
}
