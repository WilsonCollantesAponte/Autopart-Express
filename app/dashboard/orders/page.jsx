"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
export default function OrdersDashborad() {
  const [allOrders, setAllOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChange = (e) => {
    if (e.target.name === "code") {
      const uniquePaymentIds = new Set();
      const resultCodes = [];
      allOrders.forEach((order) => {
        const paymentId = order.payment_id;
        const isMatch = paymentId && paymentId.includes(e.target.value);

        if (isMatch && !uniquePaymentIds.has(paymentId)) {
          uniquePaymentIds.add(paymentId);
          resultCodes.push(order);
        }
      });

      if (resultCodes.length === 0) {
        resultCodes.push({
          Client: {
            name: "Codigo No Existe",
          },
          payment_id: "",
        });
      }
      setOrder(resultCodes);
    }
  };

  const getAllOrders = async () => {
    setIsLoading(true);
    const response = await axios.get("/dashboard/carts/api");
    const data = await response.data;
    console.log(data);
    setAllOrders(data.carts);
    setIsLoading(false);
  };

  const numeroDeOrdenes = order.length;

  const filterOrdersByUniquePaymentId = (orders) => {
    const paymentIdCounts = {};
    const uniquePaymentIdOrders = [];

    // Filter orders with unique payment_id
    orders.forEach((order) => {
      const paymentId = order.payment_id;
      if (!paymentIdCounts[paymentId]) {
        paymentIdCounts[paymentId] = 1;
        uniquePaymentIdOrders.push(order);
      }
    });

    return uniquePaymentIdOrders;
  };

  // Usage example with your provided data

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    setOrder(filterOrdersByUniquePaymentId(allOrders));
  }, [allOrders]);

  useEffect(() => {}, [order]);

  return (
    <div className="">
      <div className="w-full flex m-2 items-center">
        <label className="m-2 flex justify-center text-center">
          Buscar Codigo de Orden
        </label>
        <input
          type="search"
          // value={search.code}
          onChange={onChange}
          name="code"
          className="w-1/4 h-2 border-2 bg-white border-blue-Nav p-4 bg-transparent"
        />
      </div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
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
              {order.map((order, index) => (
                <tr
                  key={order.id}
                  className={index % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="px-4 py-2 border text-center">{order.date}</td>
                  <td className="px-4 py-2 border text-center">
                    {order.Client.name}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <Link href={`/dashboard/orders/${order.payment_id}`}>
                      {order.payment_id}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p>{`Ordenes Sin completar: ${numeroDeOrdenes}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}
