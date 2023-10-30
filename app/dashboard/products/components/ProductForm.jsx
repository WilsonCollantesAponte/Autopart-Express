"use client";
import { useRef, useState } from "react";
import axios from "axios";
export default function ProductForm() {
  const form = useRef();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    availability: "",
    brand: "",
    model: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "availability") {
      const parsedValue = parseInt(value, 10);
      setProduct({ ...product, [name]: parsedValue });
    } else {
      setProduct({ ...product, [name]: value });
    }
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
    setProduct({ ...product, image: response.data.secure_url });
  };
  //Eliminar Imagen en el front-end eliminando la URL del estado.
  const deleteImage = () => {
    setProduct({ ...product, image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      product.model === "" ||
      product.brand === "" ||
      product.price === 0 ||
      product.availability === 0 ||
      product.image === ""
    ) {
      return alert("faltan datos");
    }
    await axios.post("http://localhost:3000/dashboard/products/api/", product);
    alert("Producto Creado");
    setProduct({
      name: "",
      price: "",
      availability: "",
      brand: "",
      model: "",
      image: "",
    });
  };
  return (
    <div className="container ">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <label className="flex mx-auto border justify-center">
          Categoria del Producto
        </label>
        <input
          className="mx-auto w-full justify-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
          type="text"
          placeholder="'Bujia'"
          name="name"
          onChange={handleInputChange}
        ></input>
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

        <button className="flex m-4 border" type="submit">
          Enviar
        </button>
        {/* <button className="flex m-4 border" onClick={() => deleteProductInfo()}>
          Cancelar
        </button> */}
      </form>
      <div>
        <p>Nombre: {product.model}</p>
        <p>Marca: {product.brand}</p>
        <p>Disponibilidad: {product.availability}</p>
        <p>Precio: {product.price}</p>
        {product.image.length > 0 ? (
          <div>
            <p>Imagen Cargada</p>
            <img src={product.image} alt="" />
            <button className="flex m-4 border" onClick={() => deleteImage()}>
              Borrar Imagen
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
