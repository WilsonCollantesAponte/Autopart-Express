"use client";

import { Hero } from "@/components";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      localStorage.setItem("name", session.user.name);
      localStorage.setItem("email", session.user.email);
      localStorage.setItem("image", session.user.image);
    }
  }, [session?.user.email]);

  return (
    <main className="overflow-hidden">
      <Hero />
    </main>
  );
}
