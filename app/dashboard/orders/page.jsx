"use client";
import { useEffect, useState } from "react";
export default function OrdersDashborad() {
  const [orders, setOrders] = useState([
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
    {
      date: "2022-01-01",
      id: "276fbe10-7cc1-4142-ab87-0103193b8d1c",
      idClient: "1a14bcaf-881e-4a8c-8342-4dbc80083bf3",
      idProduct: "75f5113a-db3d-49f4-a96c-65424322c64c",
      payment_id: "1319421233",
      Product: [
        {
          id: "75f5113a-db3d-49f4-a96c-65424322c64c",
          name: "Termostato de Refrigeración",
          price: "6",
          availability: "40",
          brand: "Stant",
          model: "SuperStat",
          rating: "4",
          image: "/img_products/termostato_stant_superstat.jpg",
        },
        {
          id: "723d46d4-b71b-4db8-8897-fce2fafa41c5",
          name: "Bujías de Encendido",
          price: "8",
          availability: "77",
          brand: "NGK",
          model: "V-Power",
          rating: "4",
          image: "/img_products/bujias_encendido_npk_vpower.jpg",
        },
      ],
    },
  ]);
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

  //   useEffect(() => {
  //     // Fetch orders data here
  //     fetchOrders().then((orders) => {
  //       setOrders(orders);
  //       setIsLoading(false);
  //     });
  //   }, []);

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
                <td className="px-4 py-2 border text-center">{order.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
