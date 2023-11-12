"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function OrderDetail({ params }) {
  const { id } = params;

  const [allOrders, setAllOrders] = useState([]);
  const [orderInfo, setOrderInfo] = useState();
  const [products, setProducts] = useState([]);
  const getAllOrders = async () => {
    const response = await axios.get(
      "https://autopart-express.vercel.app/dashboard/carts/api"
    );
    const data = await response.data;
    setAllOrders(data.carts);
  };
  const order = () => {
    setOrderInfo(allOrders.filter((order) => order.payment_id === id));
  };

  const getProductsOrder = () => {
    if (orderInfo) {
      const updatedProducts = orderInfo.map((order) => ({
        quantity: order.quantity,
        image: order.Product.image,
        name: order.Product.name,
        model: order.Product.model,
        brand: order.Product.brand,
        price: order.Product.price,
      }));

      setProducts(updatedProducts);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    console.log(allOrders);
    order(allOrders);
  }, [allOrders?.length]);

  useEffect(() => {
    console.log(orderInfo);
    getProductsOrder();
  }, [orderInfo]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div>
      {orderInfo ? (
        <div>
          <h1>{`Orden #${id}`}</h1>
          <h2>{`Cliente: ${orderInfo[0]?.Client?.name}`}</h2>
        </div>
      ) : (
        <div>
          <p>Error</p>
        </div>
      )}
      <div>
        <table className="w-full y-full table-auto border-collapse">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-2 border font-bold text-white">
                Cantidad
              </th>
              <th className="px-4 py-2 border font-bold text-white">Imagen</th>
              <th className="px-4 py-2 border font-bold text-white">Nombre</th>
              <th className="px-4 py-2 border font-bold text-white">Modelo</th>
              <th className="px-4 py-2 border font-bold text-white">Marca</th>
              <th className="px-4 py-2 border font-bold text-white">Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className={"bg-gray-50"} key={product.id}>
                <td className="px-4 py-2 border text-center">
                  {product.quantity}
                </td>
                <td className="px-4 py-2 border flex items-center">
                  <img
                    className="w-20 h-20 flex items-center"
                    src={product.image}
                    alt={product.name}
                  />
                </td>
                <td className="px-4 py-2 border text-center">{product.name}</td>
                <td className="px-4 py-2 border text-center">
                  {product.model}
                </td>
                <td className="px-4 py-2 border text-center">
                  {product.brand}
                </td>
                <td className="px-4 py-2 border text-center">
                  {product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
