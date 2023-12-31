"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !localStorage.getItem("userType") ||
      localStorage.getItem("userType") !== "admin"
    )
      location.replace("/");
    else setIsLoading(false);
  }, []);

  if (isLoading) return <div className=" text-2xl font-bold">Loading...</div>;

  return (
    <section className="">
      <div className=" flex bg-indigo-100 gap-5 py-6 px-4 text-center border-y  border-gray-400 pb-6 overflow-auto  ">
        <div className=" flex col-span-2 divide-x-2 divide-gray-500 border-2 rounded border-gray-600">
          <Link
            className=" col-span-2 bg-black  text-white text-sm  font-extrabold font-serif px-3 py-2 box-border w-40 hover:bg-slate-600/75"
            href="/dashboard/clients"
          >
            Clientes
          </Link>
          <Link
            className=" text-2xl grow font-bold text-white bg-black hover:bg-slate-600/75 px-5"
            href="/client/form/signIn"
          >
            +
          </Link>
        </div>
        <div className=" flex col-span-2 divide-x-2 divide-gray-500 border-2 rounded border-gray-600">
          <Link
            className=" col-span-2 bg-black  text-white text-sm  font-extrabold font-serif px-3 py-2 box-border w-40 hover:bg-slate-600/75"
            href="/dashboard/products"
          >
            Productos
          </Link>
          <Link
            className=" text-2xl grow font-bold text-white bg-black hover:bg-slate-600/75 px-5"
            href="/dashboard/products/form"
          >
            +
          </Link>
        </div>
        <div className=" flex col-span-2 divide-x-2 divide-gray-500 border-2 rounded border-gray-600">
          <Link
            className=" col-span-2 bg-black  text-white text-sm  font-extrabold font-serif px-3 py-2 box-border w-40 hover:bg-slate-600/75"
            href="/dashboard/orders"
          >
            Órdenes
          </Link>
        </div>
        {/* <div className=" flex col-span-2 divide-x-2 divide-gray-500 border-2 rounded border-gray-600">
          <Link
            className=" col-span-2 bg-black  text-white text-sm  font-extrabold font-serif px-3 py-2 box-border w-40 hover:bg-slate-600/75"
            href=""
          >
            Carritos
          </Link>
          <Link
            className=" text-2xl grow font-bold text-white bg-black hover:bg-slate-600/75 px-5"
            href=""
          >
            +
          </Link>
        </div> */}
      </div>
      {children}
    </section>
  );
}
