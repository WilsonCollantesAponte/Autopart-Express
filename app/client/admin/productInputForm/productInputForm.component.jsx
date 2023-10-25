"use client";

export default function ProductInputForm() {
  return (
    <div className="container">
      <form>
        <label className="flex m-4">Nombre del Producto</label>
        <input className="flex m-4 bg-midnight text-center text-tahiti"></input>
        <label className="flex m-4">Precio del Producto</label>
        <input className="flex m-4"></input>
        <label className="flex m-4">Disponibilidad del Producto</label>
        <input className="flex m-4"></input>
        <label className="flex m-4">Marca del Producto</label>
        <input className="flex m-4"></input>
        <label className="flex m-4">Modelo del Producto</label>
        <select className="flex m-4">
          <option>Ford</option>
          <option>Toyota</option>
          <option>Nissan</option>
          <option>Mazda</option>
          <option>Honda</option>
          <option>Hyundai</option>
          <option>Volvo</option>
          <option>BMW</option>
          <option>Audi</option>
          <option>Mercedes</option>
          <option>Volkswagen</option>
          <option>Peugeot</option>
          <option>Renault</option>
          <option>Fiat</option>
          <option>Chevrolet</option>
          <option>Kia</option>
          <option>Daewoo</option>
          <option>Suzuki</option>
        </select>
        <button className="flex m-4">Subir Imagen</button>
        <button className="flex m-4">Borrar Imagen</button>
        <button className="flex m-4">Enviar</button>
        <button className="flex m-4">Cancelar</button>
      </form>
    </div>
  );
}

//To-Do:
//[] - escribir los <labels> de los inputs
//  [] - price
//  [] - availability
//  [] - brand
//  [] - model
//[] - codear los inputs
//[] - hacer el boton de submit
//[] - hacer el boton de subir foto
//[] - hacer el boton de borrar foto
//[] - hacer el boton de cancelar
//[] - hacer que se reflejen los inputs en la pagina para que el usuario vea los datos
//[] - configurar Cloudinary
//[] - integrar cloudinary a la form
//[] - integrar cloudinary a la base de datos
//[] - codear la funcion para submit a la base de datos
//[] - testear la info de la base de datos
