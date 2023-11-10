"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ordersList from "./orders.json";
export default function OrdersDashborad() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({
    name: "",
    code: "",
  });

  const onChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const numeroDeOrdenes = orders.length;
  useEffect(() => {
    // Fetch orders data here
    setOrders(ordersList);
    console.log(orders);
  }, []);

  return (
    <div className="">
      <div className="w-full flex m-2">
        <label className="mr-3">Buscar Nombre</label>
        <input
          type="search"
          value={search.name}
          onChange={onChange}
          name="name"
        ></input>
        <label>Buscar Codigo de Orden</label>
        <input
          type="search"
          value={search.code}
          onChange={onChange}
          name="code"
        ></input>
      </div>
      <div>
        <table className="w-full y-auto table-auto border-collapse">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-2 border font-bold text-white">Fecha</th>
              <th className="px-4 py-2 border font-bold text-white">
                Nombre Cliente
              </th>
              <th className="px-4 py-2 border font-bold text-white">
                Codigo de Orden
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-4 py-2 border text-center">{order.date}</td>
                <td className="px-4 py-2 border text-center">
                  {order.idClient}
                </td>
                <td className="px-4 py-2 border text-center">
                  <Link href={`/dashboard/orders/${order.id}`}>{order.id}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <p>{`Ordenes Sin completar: ${numeroDeOrdenes}`}</p>
        </div>
      </div>
    </div>
  );
}
