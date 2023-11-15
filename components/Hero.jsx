"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Footer, Navbar } from ".";
import Link from "next/link";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/Home.png',
    '/Home2.png',
    '/Home3.png',
  ];

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  useEffect(() => {
    const autoChangeImage = () => {
      nextImage();
    };

    const intervalId = setInterval(autoChangeImage, 5000);

    return () => clearInterval(intervalId);
  }, [currentImage]); 

  return (
    <div>
      <div className="slider-container relative">
        <button
          onClick={prevImage}
          className="slider-button prev absolute top-1/2 transform -translate-y-1/2 left-4 text-white text-4xl block sm:block"
        >
          ❮
        </button>
        <Image
          src={images[currentImage]}
          alt={`Imagen ${currentImage + 1}`}
          width={1920}
          height={1080}
          layout="responsive"
        />
        <Link href="/home">
          <div className="explore-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-white font-semibold text-md sm:text-xl bg-red-botton px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover-bg-blue-700">
              EXPLORA EL SITIO
            </p>
          </div>
        </Link>
        <button
          onClick={nextImage}
          className="slider-button next absolute top-1/2 transform -translate-y-1/2 right-4 text-white text-4xl block sm:block"
        >
          ❯
        </button>
        <button
          onClick={prevImage}
          className="slider-button prev absolute top-1/2 transform -translate-y-1/2 left-4 text-white text-4xl hidden sm:hidden"
        >
          ❮
        </button>
        <button
          onClick={nextImage}
          className="slider-button next absolute top-1/2 transform -translate-y-1/2 right-4 text-white text-4xl hidden sm:hidden"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Hero;
