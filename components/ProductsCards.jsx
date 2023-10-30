import React from "react";
import { parts } from "@/constants";
import Image from "next/image";
import { Button } from "primereact/button";

const ProductsCards = () => {
  return (
    <Link to={`/detail/${props.id}`} style={{ textDecoration: "none" }}>
    <div className="container mx-auto py-36 px-8 justify-center">
      <div className="grid lg:grid-cols-3 gap-10">
        {parts.map((autopart, index) => (
          <div key={index} className="shadow-lg flex justify-center">
            <Image
              src={autopart.img}
              alt="imagen1"
              width={100}
              height={200}
              className="object-contain"
            />
            <h3>{autopart.model}</h3>
            <p>${autopart.price}</p>
            <Button
                  label="Agregar al carrito"
                  className="p-button-raised product-detail__info__details__input__btn"
                  icon="pi pi-shopping-cart"
                  //onClick={addProductToCart}
                />
          </div>
        ))}
      </div>
    </div>
    </Link>
  );
};

export default ProductsCards;
