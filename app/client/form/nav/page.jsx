"use client";
import { use, useState } from "react";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Nav() {

  const getCart =  JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = getCart.length

  const { data: session } = useSession();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storeUserGmail = localStorage.getItem("user");
    const storeUser = localStorage.getItem("formData");

    if (storeUserGmail) {
      setFormData(JSON.parse(storeUserGmail));
    } else if (session?.user) {
      setFormData(session.user); // Usar datos de la sesión si está disponible
    } else if (storeUser) {
      setFormData(JSON.parse(storeUser));
    }
  }, [session]);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("formData");
    await signOut({ callbackUrl: "/" });
    setFormData(null);
  };

  return (
    <section className="relative mx-auto">
      <nav className="flex justify-between bg-gray-botton text-black w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <img
            className="h-20 w-auto"
            src="/autoexpress-sinfondo.png"
            alt="logo"
          />
          {/* nav-links */}
          <div className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <Link className="hover:text-gray-200" href="/">
              Inicio
            </Link>
            <Link className="hover:text-gray-200" href="/client/form/about">
              Tiendas
            </Link>
            <Link className="hover:text-gray-200" href="/dashboard/clients">
              Admin
            </Link>
            <Link className="hover:text-gray-200" href="/client/form/about">
              About
            </Link>
          </div>
          {/* iconos */}
          <div className="hidden xl:flex items-center space-x-5 ">
            <Link className="flex items-center hover:text-gray-200" href="/detail/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
                {/* MARCADOR DE ELEMENTOS EN EL CARRITO */}
                {/* <span className="flex absolute -mt-5 ml-4">
                                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                                        </span> */}
              </svg>
              {itemCount > 0 && <span className="bg-red-500 text-white rounded-full p-1">{itemCount}</span>}
            </Link>
            <div>
              {formData ? (
                <div className="hidden xl:flex items-center space-x-5 ">
                  <p>
                    {/* Hola! {formData.email} {formData.surname} */}
                    {formData.image && (
                      <img
                        className=" rounded-lg"
                        src={formData.image}
                        width="70"
                        alt="user image"
                      />
                    )}
                  </p>
                  <button className="button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden xl:flex items-center space-x-5 ">
                  <button className="button">
                    <Link href="/client/form/signIn">Sing In</Link>
                  </button>
                  <button className="button">
                    <Link href="/client/form/login"> Iniciar Sesión</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
