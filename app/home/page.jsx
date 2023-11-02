"use client";

import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Link from "next/link";

const Home = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [productsSupport, setProductsSupport] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    model: "",
  });
  const [ascendingOrder, setAscendingOrder] = useState(true);

  function handleProduct(event) {
    setPage(1);
    const { name, value } = event.target;
    filters[name] = value;
    setProducts(
      productsSupport.filter(
        (valueP) =>
          valueP.brand?.toLowerCase().includes(filters.brand.toLowerCase()) &&
          valueP.model?.toLowerCase().includes(filters.model.toLowerCase()) &&
          valueP.name?.toLowerCase().includes(filters.name.toLowerCase())
      )
    );
    setFilters({ ...filters, [name]: value });
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

  const sortedProducts = [...products].sort((a, b) => {
    const orderFactor = ascendingOrder ? 1 : -1;
    return orderFactor * (a.price - b.price);
  });

  const productsPerPage = 6; // Number of products to display per page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="flex">
      <div className="w-1/5 p-4">
        <header className="p-4 rounded-lg h-screen">
          <div className="mb-4">
            <label className="mx-1.5 text-gray-800 font-semibold" htmlFor="name">
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
            <label className="mx-1.5 text-gray-800 font-semibold" htmlFor="brand">
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
            <label className="mx-1.5 text-gray-800 font-semibold" htmlFor="model">
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
          <button
            className="w-full bg-blue-Nav hover-bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
            onClick={() => {
              setProducts(productsSupport);
              setFilters({
                name: "",
                brand: "",
                model: "",
              });
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
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 ml-2">
                      ${value.price}
                    </span>
                    <button className="button mx-2 text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      <Link href={`/detail/${value.id}`}>Comprar</Link>
                    </button>
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







