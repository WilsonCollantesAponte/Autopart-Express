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

  function handleProduct(event) {
    setPage(1);
    const { name, value } = event.target;
    filters[name] = value;
    setProducts(
      productsSupport.filter(
        (valueP) =>
          valueP.brand?.toLowerCase().includes(filters.brand.toLowerCase()) &&
          valueP.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
          valueP.model?.toLowerCase().includes(filters.model.toLowerCase())
      )
    );
    setFilters({ ...filters, [name]: value });
  }

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
        <MoonLoader size={200} className=" mx-auto" />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div>
      <header className=" flex gap-4 justify-center mt-4">
        <div>
          <label className=" mx-1.5" htmlFor="">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            onChange={handleProduct}
            value={filters.name}
          />
        </div>
        <div>
          <label className=" mx-1.5" htmlFor="">
            Marca
          </label>
          <input
            type="text"
            name="brand"
            onChange={handleProduct}
            value={filters.brand}
          />
        </div>
        <div>
          <label className=" mx-1.5" htmlFor="">
            Modelo
          </label>
          <input
            type="text"
            name="model"
            onChange={handleProduct}
            value={filters.model}
          />
        </div>
        <button
          className=" bg-gray-600/30 px-6 rounded font-bold "
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
      </header>

      <header className=" flex gap-4 justify-center mt-4">
        <button
          className=" text-4xl"
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
        >
          ⬅️
        </button>
        <span className=" text-3xl font-bold">{page}</span>
        <button
          className=" text-4xl"
          onClick={() => {
            if (page < Math.ceil(products.length / 6)) setPage(page + 1);
          }}
        >
          ➡️
        </button>
      </header>

      <div className="container bg-gray-body mx-auto py-36 px-8 justify-center">
        <div className="grid  w-auto  lg:grid-cols-3 gap-10">
          {products.slice((page - 1) * 6, page * 6).map((value, index) => (
            <div
              key={index}
              className="shadow-2xl rounded-lg max-w-xs h-96 flex-col bg-sky-100/40  "
            >
              <img
                src={value.image}
                alt=""
                width={200}
                height={300}
                className="w-full h-2/3 p-8"
              />
              <div className="pb-2 mt-3 flex flex-wrap">
                <div className="px-5 pb-5 ">
                  <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">
                    {value.name}
                  </h3>
                </div>
                <div className="px-5 pb-5 ">
                  <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">
                    {value.brand}
                  </h3>
                </div>
                <div className="px-5 pb-5 ">
                  <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">
                    {value.model}
                  </h3>
                </div>
                <div className="flex  items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900  ml-2">
                    ${value.price}
                  </span>
                    <Link href={`/detail/${value.id}`}>
                        <button className="button mx-2 text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Comprar
                          {/* <div>Comprar</div> */}
                        </button>
                      </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
