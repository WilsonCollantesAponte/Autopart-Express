'use client'
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

import timeZoneConverter from "time-zone-converter";
import timeZone from "time-zone";
import OneComment from "./oneComment";

export default function LastPurchase() {
    const [dataFetched, setDataFetched] = useState(false);
    const [profileData, setProfileData] = useState();
    const [comment , setComment] = useState();
    const [loadingToComment , setLoadingToComment] =useState(false)
    const [commentClient , setCommentClient] = useState([])
    const [loadingCommentClient , setLoadingCommentClient] = useState(true)
    const [selectedIndex , setSelectedIndex] = useState();

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


    useEffect(() => {
      const email = localStorage.getItem("email");
        fetch(`/detail/name?email=${email}`)
          .then((_r) => _r.json())
          .then((_r) => setCommentClient(_r))
          .then(() => setLoadingCommentClient(false));
    },[loadingToComment])

    console.log("datos:" , commentClient)
    return (
        <div>
        {dataFetched ? (
          <div>

            {Object.keys(profileData).map((paymentId) => (
              <div key={paymentId} className="mt-5">
                <h1>Payment: {paymentId}</h1>
                <p>Date: {profileData[paymentId].date}</p>
                <span>Total: {profileData[paymentId].total}</span>
                  <div className="mt-5">
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Imagen
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Brand
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Comments
                                    </th>
                                </tr>
                            </thead>
                          {profileData[paymentId].products.map((product, index) => (
                          <tbody>
                            <tr key={index}>
                                <th scope="col" className="px-6 py-3">
                                  <img src={product.image} alt="image" className=" w-24" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {product.name}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {product.brand}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {product.quantity}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {product.quantity}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  <div>
                                    {
                                      !loadingCommentClient ? (
                                          <div>
                                            {
                                              commentClient.some(item=> item.idProduct == product.id) ? (
                                                <div>
                                                  {
                                                    commentClient.map(item => {
                                                      if(item.idProduct == product.id){
                                                         // De la base de datos se retorna con el siguiente formato, ejemplo: "2023-11-12T01:48:24.617Z"
                                                            let [day, hour] = item.date.split("T");
                                                            const [hours, minutes] = hour.split(":");
                                                            const [age, month, currentDay] = day.split("-");

                                                            //Se adapta al formato de la librería
                                                            //Ejemplo:
                                                            // const newDateTime = timeZoneConverter('2018/10/11 18:00:00', 8, -4, 'YYYY/MM/DD HH:mm:ss')
                                                            hour = hours + ":" + minutes + ":00";
                                                            day = age + "/" + month + "/" + currentDay;

                                                            //Se usa la librería "timeZoneConverter" para convertir zonas horarias
                                                            //Se usa la librería "timeZone" para obtener la diferencia horaria con respecto a la zona horaria mundial
                                                            const newDateTime = timeZoneConverter(
                                                              day + " " + hour,
                                                              0, //Zona horaria mundial, original de la base de datos
                                                              timeZone(), // Zona horaria del país en el que se encuentre la persona que realiza el comentario
                                                              "YYYY/MM/DD HH:mm" //Formato
                                                            );
                                                            // console.log(newDateTime) => '2018/10/11 06:00:00'
                                                            return (
                                                              <OneComment
                                                                value={item}
                                                                newDateTime={newDateTime}
                                                                lengthComments={1}
                                                                setallComments={setCommentClient}
                                                                allComments={commentClient}
                                                              />
                                                            );
                                                      }
                                                    })
                                                  }
                                                </div>
                                              ): (
                                                <div>
                                                  <p>Comenta que te parecio nuestro producto!!</p>
                                                    {
                                                      selectedIndex === product.id ? (
                                                        <>
                                                          <div className=" flex">
                                                        <input
                                                          className=" w-5/6 rounded-l-md outline-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                                          type="text"
                                                          value={comment}
                                                          onChange={(e) => {
                                                            setComment(e.target.value);
                                                          }}
                                                        />
                                                        {/* submit */}
                                                        {!loadingToComment ? (
                                                          <button
                                                            className=" w-1/6 bg-indigo-500 text-white font-extrabold rounded-r-md  "
                                                            onClick={() => {
                                                              //Validar que exista un usuario
                                                              if (!localStorage.getItem("email"))
                                                                return alert("Must be logged");
                                                              //Validar que exista un mensaje
                                                              if (!comment) return alert("Commet can not be empty");

                                                              setLoadingToComment(true);
                                                              fetch("/detail/api", {
                                                                method: "POST",
                                                                body: JSON.stringify({
                                                                  emailClient: localStorage.getItem("email"),
                                                                  idProduct: product.id,
                                                                  comment,
                                                                }),
                                                              })
                                                                .then((r) => r.json())
                                                                .then((r) => {
                                                                  /* setallComments([r, ...allComments]); */
                                                                  setLoadingToComment(false);
                                                                });
                                                            }}
                                                          >
                                                            Comentar
                                                          </button>
                                                        ) : (
                                                          <div className=" w-1/6 bg-slate-300 flex items-center">
                                                            <MoonLoader className=" mx-auto" size={20} />
                                                          </div>
                                                        )}
                                                      </div>
                                                        </>
                                                      ):(
                                                        <>
                                                          <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                           onClick={() => setSelectedIndex(product.id)}>
                                                              add comment
                                                          </button>
                                                        </>
                                                      ) 
                                                    } 
                                                </div>
                                              )
                                            }
                                          </div>
                                      ):(
                                        <div className=" mt-4">
                                          <div className=" grid grid-cols-6 animate-pulse gap-y-6 gap-x-3 p-4">
                                            <div className="h-4 bg-slate-400/70 rounded-lg col-span-5"></div>
                                          </div>
                                        </div>                                             
                                      )
                                    }
                                  </div>
                                </th>
                            </tr>
                         </tbody>
                              ))}
                        </table>
                  </div>
  
              </div>
            ))}
          </div>
        ) : (
          <p>Waiting for data...</p>
        )}
      </div>
    );
  }