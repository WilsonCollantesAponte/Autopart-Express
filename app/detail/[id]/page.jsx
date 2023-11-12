"use client";

import timeZoneConverter from "time-zone-converter";
import timeZone from "time-zone";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Botonmercado from "../componente/Botonmercado";
import { useSession } from "next-auth/react";
import OneComment from "../componente/oneComment";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [id_cart, setId_cart] = useState("");
  const { data: session } = useSession("");
  const [mustBeLogged, setMustBeLogged] = useState(true);
  const [comment, setComment] = useState("");
  const [allComments, setallComments] = useState([]);
  const [loadingToComment, setLoadingToComment] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);

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
        fetch(`/detail/api?idProduct=${id}`)
          .then((_r) => _r.json())
          .then((_r) => setallComments(_r))
          .then(() => setLoadingComments(false));
      })
      .catch(() => {
        setIsLoading(false);
        setError("Failed to load");
        setLoadingComments(false);
      });

    if (localStorage.getItem("email") || session) {
      setIsLoading(false);
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
          <div className="p-1">
            {/* write */}
            <div className=" flex">
              <input
                className=" w-5/6 rounded-l-md outline-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              {/* submit */}
              {!loadingToComment ? (
                <button
                  className=" w-1/6 bg-indigo-500 text-white font-extrabold rounded-r-md  "
                  onClick={() => {
                    //Validar que exista un usuario
                    if (!localStorage.getItem("email"))
                      return alert("Must be logged");
                    //Validar que exista un mensaje
                    if (!comment) return alert("Commet can not be empty");

                    setLoadingToComment(true);
                    fetch("/detail/api", {
                      method: "POST",
                      body: JSON.stringify({
                        emailClient: localStorage.getItem("email"),
                        idProduct: id,
                        comment,
                      }),
                    })
                      .then((r) => r.json())
                      .then((r) => {
                        setallComments([r, ...allComments]);
                        setLoadingToComment(false);
                      });
                  }}
                >
                  Comentar
                </button>
              ) : (
                <div className=" w-1/6 bg-slate-300 flex items-center">
                  <MoonLoader className=" mx-auto" size={20} />
                </div>
              )}
              {/* show */}
            </div>

            {!loadingComments ? (
              <div>
                {allComments.map((value) => {
                  // De la base de datos se retorna con el siguiente formato, ejemplo: "2023-11-12T01:48:24.617Z"
                  let [day, hour] = value.date.split("T");
                  const [hours, minutes] = hour.split(":");
                  const [age, month, currentDay] = day.split("-");

                  //Se adapta al formato de la librería
                  //Ejemplo:
                  // const newDateTime = timeZoneConverter('2018/10/11 18:00:00', 8, -4, 'YYYY/MM/DD HH:mm:ss')
                  hour = hours + ":" + minutes + ":00";
                  day = age + "/" + month + "/" + currentDay;

                  //Se usa la librería "timeZoneConverter" para convertir zonas horarias
                  //Se usa la librería "timeZone" para obtener la diferencia horaria con respecto a la zona horaria mundial
                  const newDateTime = timeZoneConverter(
                    day + " " + hour,
                    0, //Zona horaria mundial, original de la base de datos
                    timeZone(), // Zona horaria del país en el que se encuentre la persona que realiza el comentario
                    "YYYY/MM/DD HH:mm" //Formato
                  );
                  // console.log(newDateTime) => '2018/10/11 06:00:00'
                  return (
                    <OneComment
                      value={value}
                      newDateTime={newDateTime}
                      lengthComments={allComments.length}
                      setallComments={setallComments}
                      allComments={allComments}
                    />
                  );
                })}
              </div>
            ) : (
              <div className=" mt-4">
                <div className=" grid grid-cols-6 animate-pulse gap-y-6 gap-x-3 p-4">
                  <div className="h-4 bg-slate-400/70 rounded-lg col-span-5"></div>
                  <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
                  <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
                  <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
                  <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
                  <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
                  <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
