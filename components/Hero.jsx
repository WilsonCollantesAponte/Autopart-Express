"use client";
import React, { useState } from 'react';
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

  return (
    <div>
      <div className="slider-container relative">
        <button
          onClick={prevImage}
          className="slider-button prev absolute top-1/2 transform -translate-y-1/2 left-4 text-white text-4xl hidden sm:block"
        >
          ❮
        </button>
        <img
          src={images[currentImage]}
          alt={`Imagen ${currentImage + 1}`}
          className="w-full h-screen sm:h-auto"
        />
        <Link href="/home">
          <div className="explore-button absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <p className="text-white font-semibold text-xl bg-red-botton px-4 py-2 rounded-lg hover:bg-blue-700">EXPLORA EL SITIO</p>
          </div>
        </Link>
        <button
          onClick={nextImage}
          className="slider-button next absolute top-1/2 transform -translate-y-1/2 right-4 text-white text-4xl hidden sm:block"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Hero;
