"use client";

import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AddToCartButton from "./addToCartButton";

const Home = () => {
  const { data: session } = useSession();

  const [mustBeLogged, setMustBeLogged] = useState(false);
  // const [loadingAddToCart, setloadingAddToCart] = useState(false);
  const [idClient, setIdClient] = useState("");

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [productsSupport, setProductsSupport] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    model: "",
    rating: 0,
  });
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [priceRange, setPriceRange] = useState("");

  function handleProduct(event) {
    setPage(1);
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  function handlePriceRange(event) {
    setPage(1);
    const { value } = event.target;
    setPriceRange(value);
  }

  function toggleOrder(orderType) {
    if (orderType === "menorPrecio") {
      setAscendingOrder(true);
    } else if (orderType === "mayorPrecio") {
      setAscendingOrder(false);
    }
  }

  const uniqueBrands = Array.from(
    new Set(productsSupport.map((product) => product.brand))
  );

  const uniqueModels = Array.from(
    new Set(productsSupport.map((product) => product.model))
  );

  useEffect(() => {
    setIsLoading(true);

    if (localStorage.getItem("email")) {
      fetch(
        `/client/form/login/api/email?email=${localStorage.getItem("email")}`
      )
        .then((r) => r.json())
        .then((r) => setIdClient(r.client[0].id));
    } else if (session) {
      fetch(`/client/form/login/api/email?email=${session.user.email}`)
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setIdClient(r.client[0].id);
        });
    } else {
      // alert("must be logged");
      setMustBeLogged(true);
    }

    fetch("/dashboard/products/api")
      .then((r) => r.json())
      .then((r) => r.products)
      .then((r) => {
        setProducts(r);
        setProductsSupport(r);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load");
      });
  }, []);

  if (isLoading)
    return (
      <div>
        <MoonLoader size={200} className="mx-auto" />
      </div>
    );
  if (error) return <div>{error}</div>;

  const filteredProducts = productsSupport
    .filter((product) =>
      product.brand?.toLowerCase().includes(filters.brand.toLowerCase())
    )
    .filter((product) =>
      product.model?.toLowerCase().includes(filters.model.toLowerCase())
    )
    .filter((product) =>
      product.name?.toLowerCase().includes(filters.name.toLowerCase())
    )
    .filter(
      (product) => filters.rating === 0 || product.rating === filters.rating
    )
    .filter((product) => {
      if (priceRange === "hasta20000") {
        return product.price <= 20000;
      } else if (priceRange === "20000a60000") {
        return product.price > 20000 && product.price <= 60000;
      } else if (priceRange === "masde60000") {
        return product.price > 60000;
      } else {
        return true;
      }
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const orderFactor = ascendingOrder ? 1 : -1;
    return orderFactor * (a.price - b.price);
  });

  const productsPerPage = 6;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="flex">
      <div className="w-1/5 p-4">
        <header className="p-4 rounded-lg h-screen">
          <div className="mb-4">
            <label
              className="mx-1.5 text-gray-800 font-semibold"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              name="name"
              onChange={handleProduct}
              value={filters.name}
              className="w-full border-2 bg-white border-blue-Nav p-4 bg-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              className="mx-1.5 text-gray-800 font-semibold"
              htmlFor="brand"
            >
              Marca
            </label>
            <select
              name="brand"
              onChange={handleProduct}
              value={filters.brand}
              className="w-full border-2 bg-white border-blue-Nav p-4 bg-transparent"
            >
              <option value="">Todas las marcas</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="mx-1.5 text-gray-800 font-semibold"
              htmlFor="model"
            >
              Modelo
            </label>
            <select
              name="model"
              onChange={handleProduct}
              value={filters.model}
              className="w-full border-2 bg-white border-blue-Nav p-4 bg-transparent"
            >
              <option value="">Todos los modelos</option>
              {uniqueModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="mx-1.5 text-gray-800 font-semibold"
              htmlFor="rating"
            >
              Rating
            </label>
            <select
              name="rating"
              onChange={handleProduct}
              value={filters.rating}
              className="w-full border-2 bg-white border-blue-Nav p-4 bg-transparent"
            >
              <option value="0">Cualquier rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="mx-1.5 text-gray-800 font-semibold"
              htmlFor="priceRange"
            >
              Precio
            </label>
            <select
              name="priceRange"
              onChange={handlePriceRange}
              value={priceRange}
              className="w-full border-2 bg-white border-blue-Nav p-4 bg-transparent"
            >
              <option value="">Cualquier precio</option>
              <option value="hasta20000">Hasta $20,000</option>
              <option value="20000a60000">$20,000 - $60,000</option>
              <option value="masde60000">Más de $60,000</option>
            </select>
          </div>
          <button
            className="w-full bg-blue-Nav hover-bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
            onClick={() => {
              setProducts(productsSupport);
              setFilters({
                name: "",
                brand: "",
                model: "",
                rating: 0,
              });
              setPriceRange("");
            }}
          >
            Reiniciar
          </button>
          <div className="mt-4">
            <span className="text-gray-800 font-semibold">Ordenar por:</span>
            <button
              className="w-full bg-blue-Nav hover-bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
              onClick={() => toggleOrder("menorPrecio")}
            >
              Menor Precio
            </button>
            <button
              className="w-full bg-blue-Nav hover-bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
              onClick={() => toggleOrder("mayorPrecio")}
            >
              Mayor Precio
            </button>
          </div>
        </header>
      </div>
      <div className="w-3/4">
        <header className="flex gap-4 justify-center mt-4">
          <button
            className="text-4xl"
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          >
            ⬅️
          </button>
          <span className="text-3xl font-bold">{page}</span>
          <button
            className="text-4xl"
            onClick={() => {
              if (page < Math.ceil(sortedProducts.length / productsPerPage)) {
                setPage(page + 1);
              }
            }}
          >
            ➡️
          </button>
        </header>

        <div className="container bg-gray-body mx-auto py-36 px-8 justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10">
            {displayedProducts.map((value, index) => (
              <div
                key={index}
                className="shadow-2xl rounded-lg max-w-xs h-96 flex-col bg-sky-100/40"
              >
                <img
                  src={value.image}
                  alt=""
                  width={200}
                  height={300}
                  className="w-full h-2/3 p-8"
                />
                <div className="pb-2 mt-3 flex flex-wrap">
                  <div className="px-5 pb-5">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                      {value.name}
                    </h3>
                  </div>
                  <div className="px-5 pb-5">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                      {value.brand}
                    </h3>
                  </div>
                  <div className="px-5 pb-5">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                      {value.model}
                    </h3>
                  </div>
                  <div className="px-5 pb-5">
                    <span className="text-gray-900 font-semibold">
                      Rating: {value.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 ml-2">
                      ${value.price}
                    </span>
                    <button className="button mx-2 text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      <Link href={`/detail/${value.id}`}>Comprar</Link>
                    </button>

                    <div>
                      <AddToCartButton
                        mustBeLogged={mustBeLogged}
                        idClient={idClient}
                        idProduct={value.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
