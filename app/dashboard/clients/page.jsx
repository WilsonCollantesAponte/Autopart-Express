"use client";

import { useEffect, useState } from "react";
import ClientRow from "./clientRow";

export default function UsersDashborad() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/dashboard/clients/api")
      .then((r) => r.json())
      .then((r) => setClients(r.allClients))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className=" m-9">
          <div className=" grid grid-cols-6 animate-pulse gap-y-6 gap-x-3 p-4">
            <div className="h-4 bg-slate-400/70 rounded-lg col-span-5"></div>
            <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
            <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
            <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
            <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
            <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
            <div className="h-4 bg-slate-400/70 rounded-lg col-span-full"></div>
          </div>
        </div>
      ) : clients ? (
        <div className=" mx-6 mb-3 border-x-2 border-gray-500 text-lg mt-10 rounded">
          <div className="flex divide-x-2 divide-gray-500 border-y-2 border-gray-500 font-semibold overflow-auto">
            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-52">Nombre(s)</div>
            </div>
            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-52">Apellido(s)</div>
            </div>
            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-72">Email</div>
            </div>

            <div className="flex items-center">
              <div className=" pl-1.5 w-72">Contraseña</div>
            </div>

            <div className="flex items-center">
              <div className=" py-2.5 pl-4 w-24">Status</div>
            </div>
            <div className="flex items-center">
              <div className=" pl-1.5 w-72">Tipo</div>
            </div>
            
            <div className="flex items-center">
              <div className=" py-2.5 pl-4">Opciones</div>
            </div>
          </div>
          {clients.map((value, index) => {
            return (
              <ClientRow
                key={index}
                clientValue={value}
                setClients={setClients}
                clients={clients}
              />
            );
          })}
        </div>
      ) : (
        <h1>Error, please try again or after {JSON.stringify(error)}</h1>
      )}
    </div>
  );
}
