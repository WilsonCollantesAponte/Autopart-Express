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
    description: "",
  });

  const handleInputChange = (e) => {
    // setProduct({ ...product, [e.target.name]: e.target.value });
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
      description: "",
    });
  };
  return (
    <div className="flex flex-col justify-start items-start border-2 border-black-100">
      <div>
        <form
          className="max-w-md mx-10 my-4 p-4 space-y-1 border border-black-100"
          onSubmit={handleSubmit}
        >
          <label className="block font-semibold">Categoría del Producto</label>
          <input
            className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
            type="text"
            placeholder="'Bujia'"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          ></input>
          <label className="block font-semibold">Nombre del Producto</label>
          <input
            className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
            type="text"
            placeholder="'Bujia'"
            name="model"
            value={product.model}
            onChange={handleInputChange}
          ></input>
          <label className="block font-semibold">Marca del Producto</label>
          <input
            className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
          ></input>
          <label className="block font-semibold">
            Descripcion del Producto
          </label>
          <textarea
            className="w-full h-32 border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent resize-none"
            type="textarea"
            rows="6"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          ></textarea>
          <label className="block font-semibold">
            Disponibilidad del Producto
          </label>
          <input
            className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
            type="text"
            name="availability"
            value={product.availability}
            onChange={handleInputChange}
          ></input>
          <label className="block font-semibold">Precio del Producto</label>

          <input
            className="w-full border-2 bg-white border-blue-Nav rounded-xl p-4 bg-transparent"
            type="text"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          ></input>
          <label className="block font-semibold">Imagen del Producto:</label>

          <input
            className="w-full border-2 border-blue-Nav rounded-xl p-4 bg-transparent"
            type="file"
            accept="image/*"
            name="image"
            onChange={changeUploadImage}
          />

          <div className="double-space"></div>

          <button
            className="w-full bg-blue-Nav hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>

      <div className="">
        <p>Preview del Producto</p>

        <div
          key={product.model}
          className="shadow-2xl rounded-lg max-w-xs h-96 flex-col bg-sky-100/40  "
        >
          <img
            src={product.image}
            alt=""
            width={200}
            height={300}
            className="w-full h-2/3 p-8"
          />
          <div className="pb-2 mt-3 flex flex-wrap">
            <div className="px-5 pb-5 ">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">
                {product.name}
              </h3>
            </div>
            <div className="px-5 pb-5 ">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">
                {product.brand}
              </h3>
            </div>
            <div className="px-5 pb-5 ">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">
                {product.model}
              </h3>
            </div>
            <div className="flex  items-center justify-between">
              <span className="text-3xl font-bold text-gray-900  ml-2">
                ${product.price}
              </span>
              <button className="button mx-2 text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Comprar
                {/* <div>Comprar</div> */}
              </button>
            </div>
          </div>
        </div>
        <button
          className="w- bg-blue-Nav hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => deleteImage()}
        >
          Borrar Imagen del Producto
        </button>
      </div>
    </div>
  );
}
