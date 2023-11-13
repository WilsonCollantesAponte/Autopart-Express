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
          if (!r.client[0]?.Accessibility.status && r.client.length !== 0) {
            signOut({ callbackUrl: "/" }).then(() => {
              localStorage.clear();
              alert("El usuario se encuentra desactivado");
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
      <nav className="flex flex-wrap items-center justify-between bg-gray-botton p-4 md:p-6">
        <Link href="/">
          <img
            className="h-16 w-auto cursor-pointer"
            src="/autoexpress-sinfondo.png"
            alt="logo"
          />
        </Link>

        {/* Nav Links */}
        <div className="flex font-semibold items-center space-x-4 md:space-x-12 mr-2">           
        <Link className="hover:text-gray-200" href="/">
            Inicio
          </Link>
          <Link className="hover:text-gray-200" href="/home">
            Home
          </Link>
          <Link className="hover:text-gray-200" href="/dashboard/clients">
            Admin
          </Link>
          <Link className="hover:text-gray-200" href="/client/form/about">
            About
          </Link>

          
        </div>

        <div className="flex flex-col items-center mt-4 md:mt-0 space-y-4 md:flex-row md:space-x-4">
          {!isLoading ? (
            <div className="flex items-center space-x-4">
              {session || email ? (
                <>
                  <p className="text-gray-200">
   		              {/* Hola! {formData.email} {formData.surname} */}

                    {session && (
                      <img
                        className="rounded-lg"
                        src={session?.user.image}
                        width="70"
                        alt="user image"
                      />
                    )}
                  </p>
                  <Link href="/client/form/profile">
                    <button className="button" >Profile</button>
                  </Link>
                  <button
                    className="button"
                    onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                {/* Cart Icon */}
          <Link href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
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
                  <button className="button">
                    <Link href="/client/form/signIn">Registro</Link>
                  </button>
                  <button className="button">
                    <Link href="/client/form/login">Iniciar Sesión</Link>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="w-64">
              <FadeLoader className="mx-auto" />
            </div>
          )}
        </div>
      </nav>
    </section>
  );
}