'use client'
import { useEffect, useState } from "react";



export default function Profile() {
    const [dataFetched, setDataFetched] = useState(false);
    const [profileData, setProfileData] = useState();
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchData = async () => {
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");
  
        if (email && name) {
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
            <h1>User profile</h1>
            <p>Name: {profileData.client[0].name}</p>
            <p>Surname: {profileData.client[0].surname}</p>
            <p>Email: {profileData.client[0].email}</p>
            <p>Password: {profileData.client[0].password}</p>
          </div>
        ) : (
          <p>Waiting for profile...</p>
        )}
      </div>
    );
  }