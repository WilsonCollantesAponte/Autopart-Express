"use client";
import { useState } from "react";
import axios from "axios";
export default function ProductForm() {
  const [product, setProduct] = useState({
    model: "",
    brand: "",
    price: "",
    availability: "",
    img: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "availability") {
      const parsedValue = parseInt(value, 10);
      setProduct({ ...product, [name]: parsedValue });
    } else {
      setProduct({ ...product, [name]: value });
    }
    console.log(product);
  };
  //Funcion para subir imagenes a Cloudinary
  const changeUploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "imagenesProductos");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dgmfqs7v9/image/upload",
      data
    );
    setProduct({ ...product, img: response.data.secure_url });
  };
  //Eliminar Imagen en el front-end eliminando la URL del estado.
  const deleteImage = () => {
    setProduct({ ...product, img: "" });
  };

  const handleSubmit = async (e) => {
    if (
      product.model === "" ||
      product.brand === "" ||
      product.price === 0 ||
      product.availability === 0 ||
      product.img === ""
    ) {
      return alert("faltan datos"); // Exit the function if any fields are empty
    }

    await axios.post("http://localhost:3000/product/form/api", product);

    alert("Producto Creado");
  };
  return (
    <div className="container ">
      <form className="mx-auto">
        <label className="flex mx-auto border justify-center">
          Nombre del Producto
        </label>
        <input
          className="mx-auto w-full justify-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
          type="text"
          placeholder="'Bujia'"
          name="model"
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
          Precio del Producto
        </label>
        <input
          className="mx-auto w-full justify-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
          type="text"
          name="price"
          onChange={handleInputChange}
        ></input>
        <label className="flex mx-auto border justify-center">
          Imagen del Producto:
        </label>
        <input
          className="flex m-4 justify-center border"
          type="file"
          accept="image/*"
          onChange={changeUploadImage}
        />

        <button
          className="flex m-4 border"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Enviar
        </button>
        <button className="flex m-4 border" onClick={() => deleteProductInfo()}>
          Cancelar
        </button>
      </form>
      <div>
        <p>Nombre: {product.model}</p>
        <p>Marca: {product.brand}</p>
        <p>Disponibilidad: {product.availability}</p>
        <p>Precio: {product.price}</p>
        {product.img.length > 0 ? (
          <div>
            <p>Imagen Cargada</p>
            <img src={product.img} alt="" />
            <button className="flex m-4 border" onClick={() => deleteImage()}>
              Borrar Imagen
            </button>
          </div>
        ) : null}
      </div>
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
//[x] - crear los estados locales para guardar los inputs
//[x] - hacer que se reflejen los inputs en la pagina para que el usuario vea los datos
//[x] - configurar Cloudinary
//[x] - integrar cloudinary a la form
//[] - codear la funcion para submit a la base de datos
//[] - testear la info de la base de datos

// export default function ProductForm() {
//   return <div> es</div>;
// }
