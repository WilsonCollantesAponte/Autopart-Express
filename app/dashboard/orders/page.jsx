"use client";
import { useEffect, useState } from "react";
export default function OrdersDashborad() {
  const [orders, setOrders] = useState([
    {
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

  //   useEffect(() => {
  //     // Fetch orders data here
  //     fetchOrders().then((orders) => {
  //       setOrders(orders);
  //       setIsLoading(false);
  //     });
  //   }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>idClient</th>
            <th>idProduct</th>
            <th>payment_id</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.idClient}</td>
              <td>{order.payment_id}</td>
              {order.Product.map((product) => (
                <td key={product.id}>{product.name}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
