"use client";

import { useEffect, useState } from "react";
// import { MoonLoader } from "react-spinners";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AddToCartButton from "./addToCartButton";

const Home = () => {
  const { data: session } = useSession();

  const [mustBeLogged, setMustBeLogged] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [idClient, setIdClient] = useState("");

  const [page, setPage] = useState(1);
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
        .then((r) => {
          setIdClient(r.client[0]?.id);
          return r;
        })
        .then((r) => {
          setMustBeLogged(false);
          return r;
        })
        .then((r) => {
          fetch(`/dashboard/products/api?idClient=${r.client[0].id}`)
            .then((r) => r.json())
            .then((r) => r.products)
            .then((r) => {
              setProducts(r);
              setProductsSupport(r);
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              setError("Failed to load");
            });
        });
    } else if (session) {
      fetch(`/client/form/login/api/email?email=${session.user.email}`)
        .then((r) => r.json())
        .then((r) => {
          setIdClient(r.client[0].id);
          return r;
        })
        .then((r) => {
          setMustBeLogged(false);
          return r;
        })
        .then((r) => {
          // fetch("/dashboard/products/api")
          fetch(`/dashboard/products/api?idClient=${r.client[0].id}`)
            .then((r) => r.json())
            .then((r) => r.products)
            .then((r) => {
              setProducts(r);
              setProductsSupport(r);
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              setError("Failed to load");
            });
        });
    } else {
      fetch("/dashboard/products/api")
        .then((r) => r.json())
        .then((r) => r.products)
        .then((r) => {
          setProducts(r);
          setProductsSupport(r);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setError("Failed to load");
        });
    }
  }, [session?.user.email, page]);

  if (isLoading)
    return (
      <div className="flex animate-pulse">
        <div className=" flex flex-col gap-9 mt-16  ml-7 w-1/4">
          <div className=" h-16 bg-slate-400/70 rounded-lg col-span-full"></div>
          <div className=" h-16 bg-slate-400/70 rounded-lg col-span-full"></div>
          <div className=" h-16 bg-slate-400/70 rounded-lg col-span-full"></div>
          <div className=" h-16 bg-slate-400/70 rounded-lg col-span-full"></div>
          <div className=" h-16 bg-slate-400/70 rounded-lg col-span-full"></div>
          <div className=" h-16 bg-slate-400/70 rounded-lg col-span-full"></div>
          <div className=" h-16 bg-slate-400/70 rounded-lg col-span-full"></div>
        </div>

        <div className=" mt-14 ml-14 w-full">
          <div className=" flex gap-3 w-fit mx-auto mb-12">
            <div className=" h-11 bg-slate-400/70 rounded-lg col-span-full w-20 mx-auto"></div>
            <div className=" h-11 bg-slate-400/70 rounded-lg col-span-full w-20 mx-auto"></div>
            <div className=" h-11 bg-slate-400/70 rounded-lg col-span-full w-20 mx-auto"></div>
          </div>

          <div className=" flex w-full justify-between  flex-wrap gap-y-9">
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
            <div className=" bg-slate-300/90 p-11 pb-8 rounded-2xl h-fit">
              <div className=" h-60 bg-slate-400/70 w-52 rounded-lg"></div>
              <div className=" flex justify-between">
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
                <span className=" h-11 bg-slate-400/70 w-24 rounded-lg mt-4"></span>
              </div>
            </div>
          </div>
        </div>
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
  //console.log(displayedProducts)

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
          <span className="text-3xl font-bold">{page}/{Math.ceil(sortedProducts.length / productsPerPage)}</span>
          
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
            {console.log(displayedProducts)}
            {displayedProducts.map((value, index) => (
            <div key={index} className="shadow-2xl rounded-lg max-w-xs h-auto bg-sky-100/40">
             <div className="h-1/2 relative">
              <img src={value.image} 
                alt={value.name} 
                className="w-full h-full object-cover max-h-1/2" 
              />
             </div>
             <div className="p-4 h-1/2 flex flex-col justify-between overflow-y-auto">
              <div>
                <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                  {value.name}
                </h3>
                <p className="text-gray-900 font-semibold text-xl tracking-tight">
                  {value.brand}
                </p>
                <p className="text-gray-900 font-semibold text-xl tracking-tight">
                  {value.model}
                </p>
                <p className="text-gray-900 font-semibold">
                  Rating: {value.rating}
                </p>
                <span className="text-3xl font-bold text-gray-900">
                  ${value.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
           
                <button className="button text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <Link href={`/detail/${value.id}`}>Comprar</Link>
                </button>
                {/* {console.log("esto",value.Cart)} */}
                <AddToCartButton
                  inCart={value.Cart.length}
                  mustBeLogged={mustBeLogged}
                  idClient={idClient}
                  idProduct={value.id}
                />
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
