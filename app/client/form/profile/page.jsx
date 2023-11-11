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
      <div>
        {dataFetched ? (
          <div>
            {/* Muestra los datos del perfil */}
            <h1>User Profile</h1>
            <p>Name: {profileData.client[0].name}</p>
            <p>Surname: {profileData.client[0].surname}</p>
            <p>Email: {profileData.client[0].email}</p>
            <p>Password: {profileData.client[0].password}</p>
            <Link href="/client/form/profile/lastPur">Last Purchased</Link>
          </div>
        ) : (
          <p>Waiting for data...</p>
        )}
      </div>
    );
  }