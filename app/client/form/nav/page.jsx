"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FadeLoader } from "react-spinners";

export default function Nav() {
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(true);

    if (!session && !localStorage.getItem("email")) {
      setIsLoading(false);
      return;
    }
    if (session) {
      fetch(`/client/form/login/api/email?email=${session.user.email}`, {
        method: "GET",
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.client.length === 0) {
            fetch("/client/form/signIn/api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: session?.user?.name,
                surname: session?.user?.name,
                email: session?.user?.email,
                password: session?.user?.email,
              }),
            });
          }
          return r;
        })
        .then((r) => {
          if (!r.client[0]?.Accessibility.status) {
            signOut({ callbackUrl: "/" }).then(() => {
              localStorage.clear();
              alert("El usuario se encuantra desactivado");
            });
          } else {
            setIsLoading(false);
          }
        });
    } else if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
      setIsLoading(false);
    }
  }, [session?.user?.email]);

  const handleLogout = () => {
    localStorage.clear();
    signOut({ callbackUrl: "/" });
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
            <Link
              className="flex items-center hover:text-gray-200"
              href="/cart"
            >
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
            </Link>
            {!isLoading ? (
              <div className=" w-64">
                {session || email ? (
                  <div className="hidden xl:flex items-center space-x-5 ">
                    <p>
                      {/* Hola! {formData.email} {formData.surname} */}
                      {session && (
                        <img
                          className=" rounded-lg"
                          src={session?.user.image}
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
            ) : (
              <div className=" w-64  ">
                <FadeLoader className="mx-auto" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
}
