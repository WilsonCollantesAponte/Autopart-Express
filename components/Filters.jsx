import React from "react";

const getBrand = async () => {
  try {
    const response = await fetch(`http://localhost:3000/product/api/brand`, {
      method: "GET",
    }).then((response) => response.json());
    // console.log(response);
    return response;
  } catch (error) {
    console.group(error);
  }
};

async function Filters() {
  const response = await getBrand();
  //   console.log(response);

  return (
    <div className="pt-2 pl-4">
      <select defaultValue="Brand" className="button mr-1">
        Categoria
        <option value="Brand" disabled>
          Marcas
        </option>
        {response.brandUnicos.map((ele) => (
          <option key={ele} value={ele}>
            {ele}
          </option>
        ))}
      </select>

      <select defaultValue="name" className="button mr-1">
        Categoria
        <option value="name" disabled>
          Categoria
        </option>
        {/* {
                response.nameUnicos.map(ele => <option key={ele} value={ele}>
                    {ele}
                </option>)
            } */}
      </select>

      <select defaultValue="Precio" className="button mr-1">
        Precio
        <option value="Precio" disabled>
          Precio
        </option>
        <option value="ascendente">menor -mayor </option>
        <option value="descendente">mayor - menor</option>
      </select>

      <select defaultValue="Calificacion" className="button mr-1">
        Calificacion
        <option value="Calificacion" disabled>
          Calificacion
        </option>
        <option value="ascendente">menor - mayor</option>
        <option value="descendente">mayor - menor</option>
      </select>
    </div>
  );
}

export default Filters;
