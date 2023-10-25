"use client";
import { useState } from "react";
export default function ProductInputForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    availability: "",
    brand: "",
    model: "",
  });

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log(product);
  };
  const handleSelectBrand = (e) => {
    setProduct({ ...product, brand: e.target.value });
    console.log(product);
  };
  return (
    <div className="container ">
      <form class="mx-auto">
        <label class="flex mx-auto border justify-center">
          Nombre del Producto
        </label>
        <input
          class="mx-auto w-full justify-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
          type="text"
          placeholder="'Bujia'"
          name="model"
          onChange={handleInputChange}
        ></input>
        <label className="flex mx-auto border justify-center">
          Precio del Producto
        </label>
        <input
          className="mx-auto w-full justify-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
          type="text"
          name="price"
          onChange={handleInputChange}
        ></input>
        <label className="flex mx-auto border justify-center">
          Disponibilidad del Producto
        </label>
        <input
          className="mx-auto w-full justify-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
          type="text"
          name="availability"
          onChange={handleInputChange}
        ></input>
        <label className="flex mx-auto border justify-center">
          Marca del Producto
        </label>
        <input
          className="mx-auto w-full justify-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
          type="text"
          name="brand"
          onChange={handleInputChange}
        ></input>
        <button className="flex m-4 justify-center border">Subir Imagen</button>
        <button className="flex m-4 border">Borrar Imagen</button>
        <button className="flex m-4 border">Enviar</button>
        <button className="flex m-4 border">Cancelar</button>
      </form>
    </div>
  );
}

//To-Do:
//[x] - escribir los <labels> de los inputs
//  [x] - price
//  [x] - availability
//  [x] - brand
//  [x] - model
//[x] - codear los inputs
//[x] - hacer el boton de submit
//[x] - hacer el boton de subir foto
//[x] - hacer el boton de borrar foto
//[x] - hacer el boton de cancelar
//[] - crear los estados locales para guardar los inputs
//[] - hacer que se reflejen los inputs en la pagina para que el usuario vea los datos
//[] - configurar Cloudinary
//[] - integrar cloudinary a la form
//[] - integrar cloudinary a la base de datos
//[] - codear la funcion para submit a la base de datos
//[] - testear la info de la base de datos
