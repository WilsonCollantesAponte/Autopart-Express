'use client'

import { useEffect , useState} from "react"
import { MoonLoader } from "react-spinners";
import Botonmercado from "../componente/Botonmercado";
export default function ProductDetail ({params}) { 

    const {id} = params;
    const [product,setProduct] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    //const [cantidad,setCantidad] = useState([]);


    const restar = () => {
        setProduct((prevProduct) => {
            const newQuantity = prevProduct.quantity - 1;
            return{
              ...prevProduct,
              quantity: newQuantity > 0 ? newQuantity : 0,
            };
        })
    }

    const sumar = () => {
        setProduct((prevProduct) => {
            const newQuantity = prevProduct.quantity + 1;
            return{
              ...prevProduct,
              quantity: newQuantity > 0 ? newQuantity : 0,
            };
        })
    }

    const handlerQuantity = (event) =>{
        const newQuantity = parseInt(event.target.value);
        if(!isNaN(newQuantity)){
          setProduct((prevProduct)=> {
            return{
                ...prevProduct,
               quantity:newQuantity,
              };
          })
        }
      }

    useEffect(() => {
       
            fetch(`/product/api/${id}`)
        .then((r) => r.json())
        .then((r) => r.product)
        .then((r) => {
            setProduct({
                id: r.id,     
                name: r.name,
                price: Number(r.price),
                availability: r.availability,
                brand: r.brand,
                model: r.model,
                rating: r.rating,
                image: r.image, 
                quantity: 0,
              });
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

    return (
        <>
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                    src={product?.image}
                    alt=""
                    width={350}
                    height={350}
                    className="w-350 h-150 object-cover rounded-lg"
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.brand}</h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{`${product?.name} | ${product?.model}`} </h1>
                    <div className="flex mb-4">
                    
                    </div>
                    <p className="leading-relaxed">Caracteristicas</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                    </div>
                    <div className="flex  mb-5">
                        <p className="mr-2">Stock disponible</p>
                        
                        
                        <p>{`(${product?.availability} unidades disponibles)`}</p>
                    </div>
                    <div  className="flex flex-row h-10  rounded-lg relative bg-transparent mt-1 mb-5">
                        <label className="mr-2">cantidad</label>
                        <button onClick={restar} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <span className="m-auto text-2xl font-thin">−</span>
                                </button>
                                <input 
                                type="number"
                                className="outline-none focus:outline-none text-center  w-20 bg-gray-300 font-semibold text-md  focus:text-black  md:text-basecursor-default flex text-gray-700  " 
                                name="custom-input-number" 
                                value={product?.quantity }
                                onChange={() => handlerQuantity()}>
                                </input>
                                <button onClick={sumar} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                            <span  className="m-auto text-2xl font-thin">+</span>
                        </button>
                    </div>

                    <div className="flex ">
                        <span className="title-font font-medium text-2xl mr-5 text-gray-900">${product?.price}</span>

                        {product?.quantity == 0 ? (
                            <p className="font-medium text-red-700">debe seleccionar al menos un producto</p>
                            
                            ) : (
                            <Botonmercado  producto={[product]}/>
                        )
                        }

                   </div>
                </div>
                </div>
            </div>
            </section>
        </>
    )
}

