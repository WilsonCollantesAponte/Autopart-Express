"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Botonmercado from "../detail/componente/Botonmercado";

export default function Cart() {
  //   const [e, setE] = useState("");

  const [productsInTheCart, setProductsInTheCart] = useState([]);
  const [mustBeLogged, setMustBeLogged] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  const { data: session } = useSession();
  const [total,setTotal] = useState(0);
  const [productList , setProductList] = useState([])

  useEffect(() => { 
    if (localStorage.getItem("email")) {
      //   setE(localStorage.getItem("email"));
      fetch(`/cart/api?email=${localStorage.getItem("email")}`)
        .then((r) => r.json())
        .then((r) => {
             setProductsInTheCart(r);
             localStorage.setItem("productsInTheCart", JSON.stringify(r));
            })
        .then(() => setisLoading(false))
        .then(() => setMustBeLogged(false));
    } else if (session) {
      fetch(`/cart/api?email=${session.user.email}`)
        .then((r) => r.json())
        .then((r) => {
            setProductsInTheCart(r);
            localStorage.setItem("productsInTheCart", JSON.stringify(r));})
        .then(() => setisLoading(false))
        .then(() => setMustBeLogged(false));
    } else {
      setisLoading(false);
      //   setMustBeLogged(true);
    }
  }, [session?.user.email]);

  useEffect(() => {
    let sum = 0;
    const extractedProducts = productsInTheCart.map((value) => value.Product);
    productsInTheCart.forEach((value) => {
      sum += Number(value.Product.price);
    });
    setTotal(sum);
    console.log(extractedProducts)
    setProductList(extractedProducts)
  }, [productsInTheCart]);

  if (isLoading) return <div>Loading...</div>;

  if (mustBeLogged) return <div>Must be Logged</div>;

  return (
    <>            
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Imagen
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
            {productsInTheCart.map((value, index) => (
              <tr className="bg-white border-b  hover:bg-gray-50 ">
              <th  scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              <img src={value.Product.image} alt="image" className=" w-24" />
              </th>
              <td className="px-6 py-4">
              {value.Product.name}
              </td>
              <td className="px-6 py-4 ">
                      <div className="custom-number-input h-10 w-32">
                          {/* <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                              <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                  <span className="m-auto text-2xl font-thin">−</span>
                              </button>
                              <input type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input>
                              <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                  <span className="m-auto text-2xl font-thin">+</span>
                              </button>
                          </div> */}
                      </div>
              </td>
              <td className="px-6 py-4">
              {value.Product.price}
              </td>
          </tr>
            ))}
                
                <tr className="bg-white border-b hover:bg-gray-50 ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        Total
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                       
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                       
                    </th>
                    <td className="px-6 py-4">
                     {total}
                    </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50 ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                       
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                       
                    </th>
                    <td className="px-6 py-4">
                    {productList.length !==0 ? (
                            
                            <Botonmercado cantidad={total} producto={productList}/>
                        ) : (
                            <p>loading..</p>
                        )
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    </>
  );
}

{/* <main className=" flex flex-wrap">
{productsInTheCart.map((value, index) => (
  <div
    key={index}
    className="shadow-2xl rounded-lg max-w-xs h-fit py-4 flex-col bg-sky-100/40 border-indigo-600   border-4 "
  >
    <img src={value.Product.image} alt="image" className=" w-24" />

    <div className="px-5 pb-5">
      <label className=" font-medium">Stok: </label>
      <span className="text-gray-900 font-semibold text-xl tracking-tight">
        {value.Product.availability}
      </span>
    </div>

    <div className="px-5 pb-5">
      <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
        {value.Product.name}
      </h3>
    </div>
    <div className="px-5 pb-5">
      <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
        {value.Product.brand}
      </h3>
    </div>
    <div className="px-5 pb-5">
      <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
        {value.Product.model}
      </h3>
    </div>
    <div>
      <label htmlFor="">Unidades a pedir: </label>
      <input type="number" />
    </div>
  </div>
))}
</main> */}