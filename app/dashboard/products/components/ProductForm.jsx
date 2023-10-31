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
    setProduct({ ...product, [e.target.name]: e.target.value });
    // const { name, value } = e.target;
    // if (name === "price" || name === "availability") {
    //   const parsedValue = parseInt(value, 10);
    //   setProduct({ ...product, [name]: parsedValue });
    // } else {
    //   setProduct({ ...product, [name]: value });
    // }
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
    <div className="flex flex-col justify-center items-center">
      <form className="max-w-md mx-auto p-4 space-y-1" onSubmit={handleSubmit}>
        <label className="block font-semibold">Categoría del Producto</label>
        <input
          className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
          type="text"
          placeholder="'Bujia'"
          name="name"
          onChange={handleInputChange}
        ></input>
        <label className="block font-semibold">Nombre del Producto</label>
        <input
          className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
          type="text"
          placeholder="'Bujia'"
          name="model"
          onChange={handleInputChange}
        ></input>
        <label className="block font-semibold">Marca del Producto</label>
        <input
          className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
          type="text"
          name="brand"
          onChange={handleInputChange}
        ></input>
        <label className="block font-semibold">
          Disponibilidad del Producto
        </label>
        <input
          className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
          type="text"
          name="availability"
          onChange={handleInputChange}
        ></input>
        <label className="block font-semibold">Precio del Producto</label>

        <input
          className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
          type="text"
          name="price"
          onChange={handleInputChange}
        ></input>
        <label className="block font-semibold">Imagen del Producto:</label>

        <input
          className="w-full border-2 border-blue-Nav rounded-xl p-4 bg-transparent"
          type="file"
          accept="image/*"
          onChange={changeUploadImage}
        />

        <div className="double-space"></div>

        <button
          className="w-full bg-blue-Nav hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Enviar
        </button>

        {/* <button className="flex m-4 border" onClick={() => deleteProductInfo()}>
          Cancelar
        </button> */}
      </form>
      <div>
        <p className="font-semibold">Nombre: {product.model}</p>
        <p className="font-semibold">Marca: {product.brand}</p>
        <p className="font-semibold">Disponibilidad: {product.availability}</p>
        <p className="font-semibold">Precio: {product.price}</p>
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
