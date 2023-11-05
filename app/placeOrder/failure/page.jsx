"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function page() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(session?.user.email || localStorage.getItem("email"));
  }, [session?.user.email]);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            {email ? (
              <div>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Compra fallida. {email}
                </h1>
              </div>
            ) : (
              <p>loading...</p>
            )}
          </div>
          <Link href="/home">
            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              vuelva a intentar
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default page;
