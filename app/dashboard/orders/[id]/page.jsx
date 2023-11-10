"use client";
import { useEffect } from "react";
import ordersList from "../orders.json";
export default function OrderDetail({ params, ordersList }) {
  const { id } = params;
  const order = () => {
    const datosOrden = ordersList.find((order) => order.id === id);
    return datosOrden;
  };

  useEffect(() => {
    console.log(params);
    order();
  });
  return (
    <div>
      <div>
        <h1>{`Orden #${id}`}</h1>
        {/* <h2>{`Pago #${paymentID}`}</h2> */}
        {/* <h2>{`Cliente: ${clientName}`}</h2> */}
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {/* {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.availability}</td>
                <td>{product.brand}</td>
                <td>{product.model}</td>
                <td>{product.rating}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
