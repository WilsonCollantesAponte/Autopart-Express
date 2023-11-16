"use client";

import { useEffect, useState } from "react";
import ProductRow from "./productRow";

export default function UsersDashborad() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/dashboard/products/api")
      .then((r) => r.json())
      .then((r) => setProducts(r.products))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className=" m-9">
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
      ) : products ? (
        
        <div className=" mx-6 mb-3 border-x-2 border-gray-500 text-lg mt-10 rounded">
          <div className="flex divide-x-2 divide-gray-500 border-y-2 border-gray-500 font-semibold overflow-auto">
            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-52">Nombre</div>
            </div>
            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-24">Precio</div>
            </div>
            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-40">Disponibilidad</div>
            </div>
            <div className="flex items-center">
              <div className=" pl-1.5 w-52">Marca</div>
            </div>
            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-52">Modelo</div>
            </div>
            {/* <div className="flex items-center">
              <div className=" py-2.5 pl-3 w-20">Rating</div>
            </div> */}
            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-28">Imagen</div>
            </div>
            <div className="flex items-center">
              <div className="py-2.5 pl-3 w-20">Status</div>
            </div>
            <div className="flex items-center">
              <div className=" py-2.5 pl-4">Opciones</div>
            </div>
          </div>
        
          {products.map((value, index) => {
            return (
              <ProductRow
                key={index}
                productValue={value}
                setProducts={setProducts}
                products={products}
              />
            );
          })}
        </div>
      ) : (
        <h1>Error, please try again or after {JSON.stringify(error)}</h1>
      )}
    </div>
  );
}
