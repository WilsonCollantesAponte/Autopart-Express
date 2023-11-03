'use client'

import { useEffect , useState} from "react"
import { useParams } from "next/navigation"
import { MoonLoader } from "react-spinners";

export default function ProductDetail ({params}) {

    //const params = useParams();
    //const id = params.id.slice(-1)
    const {id} = params;
    console.log(id); 

    const [product,setProduct] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [cantidad,setCantidad] = useState(0);

    const restar = () => {
        if(cantidad>0){
            setCantidad(cantidad - 1);
        }
    }

    const sumar = () => {
        if(cantidad<product?.availability){
            setCantidad(cantidad + 1);
        }
    }

    useEffect(() => {
       
            fetch(`/product/api/${id}`)
        .then((r) => r.json())
        .then((r) => r.product)
        .then((r) => {
            setProduct(r);
            setIsLoading(false);
        })
        .catch(() => {
            setError("Failed to load");
        });
          
      },[id])

    if (isLoading)
        return (
        <div>
            <MoonLoader size={200} className=" mx-auto" />
        </div>
        );
    if (error) return <div>{error}</div>;
        console.log(product)
        return (
            <>
              <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                  <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                      src={product?.image}
                      alt=""
                      width={200}
                      height={300}
                      className="w-full h-2/3 p-8 lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                    />
                    <div className="lg:w-1/2 w-full">
                    
                      <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{`${product?.name}`}</h1>
                    
                      <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
                     
                      <div className="flex mb-4"></div>
                      
                      <h2 className="text-m title-font text-red-font mr-2"> Marca: 
                        {product?.brand}
                      </h2>
                      <h2 className="text-m title-font text-red-font mr-2"> Modelo: 
                        {product?.model}
                      </h2>
                      <p className="text-small title-font text-red-font mr-2">Rating: {product?.rating}</p>
                      <div className="flex mb-4"></div>
                      <p className="text-m title-font text-gray-700 mr-2">Caracteristicas: </p>
                      <div className="flex mt-3 items-center pb-4 border-b-2 border-gray-100 mb-5"></div>
                      <div className="flex mb-4">
                        <p className="text-m mr-2 title-font text-gray-700">Stock disponible</p>
                        <p>{`(${product?.availability} unidades)`}</p>
                      </div>
                      <div className="flex flex-row h-10 rounded-lg relative bg-transparent mt-1 mb-5">
                        <label className="text-m mr-2 title-font text-gray-700">Cantidad</label>
                        <button onClick={restar} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                          type="number"
                          className="outline-none focus:outline-none text-center  w-20 bg-gray-300 font-semibold text-md  focus:text-black  md:text-base cursor-default flex text-gray-700  "
                          name="custom-input-number"
                          value={`${cantidad}`}
                        ></input>
                        <button onClick={sumar} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                      <div className="flex">
                        
                        <button className="bg-blue-500 hover:bg-yellow-400 text-white font-medium rounded-lg text-sm px-6 py-2.5 text-center">
                          Mercado Pago
                        </button>
                        <div className="ml-4">
                        <button className="text-red-botton border-2 border-red-botton hover:bg-red-botton hover:text-white font-medium rounded-lg text-sm px-5 py-2 text-center">
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
}


