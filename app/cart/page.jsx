"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Botonmercado from "../detail/componente/Botonmercado";
import { MoonLoader } from "react-spinners";

export default function Cart() {
  //   const [e, setE] = useState("");

  const [productsInTheCart, setProductsInTheCart] = useState([]);
  const [mustBeLogged, setMustBeLogged] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  const { data: session } = useSession();
  const [total,setTotal] = useState(0);
  const [productList , setProductList] = useState([])
  const [id_cart , setId_cart] = useState([]);
  //const [cantidad ,setCantidad] = useState([])

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

  //EXTRAE LOS PRODUCTOS SUBIDOS AL CARRO SE LE ASIGNA UN NUEVO CAMPO AL OBJETO CANTIDAD NECESARIO PARA MERCADOLIBRE
  //Y TOTAL PARA MOSTRAR AL CLIENTE 
  //EXTRAIGO IDCART PARA LUEGO MODIFICAR EL PAGO ASOCIADO
  useEffect(() => {
    const extractedProducts = productsInTheCart.map((value) => {
      return{
        id: value.Product?.id,     
        name: value.Product?.name,
        price: Number(value.Product?.price),
        availability: value.Product?.availability,
        brand: value.Product?.brand,
        model: value.Product?.model,
        rating: value.Product?.rating,
        image: value.Product?.image, 
        quantity: 0,
        newprice: 0,
        idCart: value.id,
      }
    });
    setProductList(extractedProducts);
    
  }, [productsInTheCart]);


  const restar = (index) => {
    setProductList((prevProductList) => {
      return prevProductList.map((product,i)=> {
        if(i == index){
          const newQuantity = product.quantity - 1;
          if(newQuantity>=0){
            return{
              ...product,
              newprice: Number(product.price) * newQuantity,
              quantity: newQuantity >= 0 ? newQuantity : 0,
            };
          }
        }
        return product;
      })
     })
}

const sumar = (index) => {
   setProductList((prevProductList) => {
    const upDateList = prevProductList.map((product,i)=> {
      if(i == index){
        const newQuantity = product.quantity + 1;
        if(newQuantity<=product.availability){
          return{
            ...product,
            newprice: product.price * newQuantity,
            quantity:  newQuantity <= product.availability ? newQuantity : product.availability,
          };
        }
      }
      return product;
    });
    calculateTotal(upDateList);
      return upDateList
   })
}

const handlerQuantity = (index , event) =>{
  const newQuantity = parseInt(event.target.value);
  if(!isNaN(newQuantity)){
    setProductList((prevProductList)=> {
      const upDateList = prevProductList.map((product,i)=>{
        if(i==index){
          return{
            ...product,
            newprice: product.price * newQuantity,
            quantity:newQuantity,
          };
        }
        return product;
      });
      calculateTotal(upDateList);
      return upDateList
    })
  }
}

const calculateTotal = (list) => {
  const totalPrice = list.reduce((total, product) => total + product.newprice, 0);
  setTotal(totalPrice);
};

useEffect(() => {
  calculateTotal(productList);
  const idcartLimpio = productList.filter((value) => value.quantity !== 0 );
  const extraeIdCart = idcartLimpio?.map((value) => value.idCart);
  setId_cart(extraeIdCart);
}, [productList]);

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
            {productList.map((value, index) => (
              <tr className="bg-white border-b  hover:bg-gray-50 ">
              <th  scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              <img src={value.image} alt="image" className=" w-24" />
              <span>stock ({value.availability})</span>
              </th>
              <td className="px-6 py-4">
              {value.name}
              </td>
              <td className="px-6 py-4 ">
                      <div className="custom-number-input h-10 w-32">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                              <button onClick={() => restar(index)} data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                  <span className="m-auto text-2xl font-thin">−</span>
                              </button>
                              <input
                                type="number"
                                className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                name="custom-input-number" 
                                value={value.quantity}
                                onChange={() => handlerQuantity(index)}>
                                </input>
                              <button onClick={() => sumar(index)} data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                  <span className="m-auto text-2xl font-thin">+</span>
                              </button>
                          </div>
                      </div>
              </td>
              <td className="px-6 py-4">
              <span>{value.newprice}</span>
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
                    {total !==0 ? (
                            
                            <Botonmercado producto={productList} id_cart={id_cart} mustBeLogged={mustBeLogged}/>
                        ) : (
                            <p>Selecciones al menos un producto</p>
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