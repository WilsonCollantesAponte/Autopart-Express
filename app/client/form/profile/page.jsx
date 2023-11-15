'use client'
import { useEffect, useState } from "react";
import Link from "next/link";



export default function Profile() {
    const [dataFetched, setDataFetched] = useState(false);
    const [profileData, setProfileData] = useState();
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchData = async () => {
        const email = localStorage.getItem("email");
        
  
        if (email) {
          try {
            const responseIsActive = await fetch(
              `/client/form/login/api/email?email=${email}`,
              {
                method: "GET",
              }
            );
  
            if (isMounted) {
              const response = await responseIsActive.json();
              console.log(response);
  
              // Guarda los datos en el estado
              setProfileData(response);
  
              // Marca que los datos han sido recuperados
              setDataFetched(true);
              localStorage.setItem("idClient", response.client[0].id);
            }
          } catch (error) {
            // Maneja errores de red o del servidor
            console.error("Error al obtener los datos del perfil:", error);
          }
        }
      };
  
      fetchData();
  
      return () => {
        isMounted = false;
      };
    }, []);

    console.log(profileData);
  
    return (
      <div className="max-w-md mx-auto p-4 space-y-2">
        {dataFetched ? (
          <div>
            {/* Muestra los datos del perfil */}
            <h1 className="text-2xl font-bold text-center">Perfil de Usuario</h1>
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold">
                Nombre de usuario:
              </label>
              <p className="w-full border-2 bg-white border-blue-Nav rounded-xl p-3 bg-transparent">
                {profileData.client[0].name}
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="surname" className="block font-semibold">
                Apellido:
              </label>
              <p className="w-full border-2 bg-white border-blue-Nav rounded-xl p-3 bg-transparent">
                {profileData.client[0].surname}
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold">
                Email:
              </label>
              <p className="w-full border-2 bg-white border-blue-Nav rounded-xl p-3 bg-transparent">
                {profileData.client[0].email}
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-semibold">
                Contraseña:
              </label>
              <p className="w-full border-2 bg-white border-blue-Nav rounded-xl p-3 bg-transparent">
                {profileData.client[0].password}
              </p>
            </div>
            <Link
              href="/client/form/profile/lastPur"
              className="w-full bg-blue-Nav hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ver últimas compras
            </Link>
          </div>
        ) : (
          <p>Esperando los datos...</p>
        )}
      </div>
    );
  }