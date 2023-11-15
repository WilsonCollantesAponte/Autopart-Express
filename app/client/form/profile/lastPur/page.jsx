'use client'
import { useEffect, useState } from "react";




export default function LastPurchase() {
    const [dataFetched, setDataFetched] = useState(false);
    const [profileData, setProfileData] = useState();
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchData = async () => {
        const idClient = localStorage.getItem("idClient");
        
  
        if (idClient) {
          try {
            const responseIsActive = await fetch(
              `/dashboard/clients/facturacion?idClient=${idClient}`,
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

            {Object.keys(profileData).map((paymentId) => (
              <div key={paymentId}>
                <h1>ID de Pago: {paymentId}</h1>
                <p>Fecha: {profileData[paymentId].date}</p>
                
                <h3>Productos:</h3>
                {profileData[paymentId].products.map((product, index) => (
                  <div key={index}>
                    <p>Nombre: {product.name}</p>
                    <p>Marca: {product.brand}</p>
                    <p>Precio: {product.price}</p>
                    <p>Cantidad: {product.quantity}</p>
                    <img src={product.image} alt={product.name} />

                  </div>
                ))}
         <p>Total: {profileData[paymentId].total}</p>
  
              </div>
            ))}
          </div>
        ) : (
          <p>Esperando los datos...</p>
        )}
      </div>
    );
  }