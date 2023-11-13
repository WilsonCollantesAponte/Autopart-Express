"use client";
import React from 'react';

const About = () => {
  return (
    <section className="flex items-center justify-center bg-stone-50 xl:h-screen-2 font-poppins dark:bg-gray-800">
      <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
        <img
          src="/about.png"
          alt="about"
          className="mx-auto"
        />
        <div className="flex flex-wrap items-center mt-8"> {/* Agregado mt-8 para espacio arriba del texto */}
          <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
            <div className="lg:max-w-md">
              <span className="text-xl font-semibold text-red-font uppercase dark:text-red-font">
                Acerca de AutoParts-Express
              </span>
              <h2 className="mt-4 mb-6 text-justify text-2xl font-bold dark:text-gray-300">
                Tu fuente confiable para encontrar autopartes para tu vehículo
              </h2>
              <p className="mb-10 text-justify text-gray-600 dark:text-gray-400">
                En AutoParts-Express, nos dedicamos a proporcionar soluciones de calidad para mantener tu automóvil en su mejor estado. Nos esforzamos por ofrecer una amplia selección de productos, desde frenos y filtros hasta accesorios de última generación. Nos comprometemos a proporcionar productos de calidad de las mejores marcas del mercado.
              </p>
              <p className="mb-10 text-gray-600 dark:text-gray-700">
                Gracias por confiar en AutoParts-Express. ¡Esperamos ser tu socio confiable en el mantenimiento y mejora de tu automóvil!
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="flex flex-col justify-center">
              <div className="flex mb-4">
                <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-red-500 rounded dark:bg-red-font dark:text-gray-100 text-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </span>
                <div>
                  <h2 className="mb-4 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                    Experiencia del Cliente
                  </h2>
                  <p className="text-base leading-loose text-gray-600 dark:text-gray-400">
                    Tu satisfacción es nuestra prioridad, por eso te brindamos una experiencia de compra que supere tus expectativas.
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-red-500 rounded dark:bg-red-font dark:text-gray-100 text-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </span>
                <div>
                  <h2 className="mb-4 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                    Calidad
                  </h2>
                  <p className="text-base leading-loose text-gray-600 dark:text-gray-400">
                    Ofrecemos lo mejor en términos de durabilidad y rendimiento. Cada autoparte está respaldada por garantías.
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-6 bg-red-500 rounded dark:bg-red-font dark:text-gray-100 text-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                  </svg>
                </span>
                <div>
                  <h2 className="mb-4 text-xl font-bold leading-tight dark:text-gray-300 md:text-2xl">
                    Variedad
                  </h2>
                  <p className="text-base leading-loose text-gray-600 dark:text-gray-400">
                    Tenemos desde productos de mantenimiento hasta opciones para personalizar y optimizar tu vehículo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
