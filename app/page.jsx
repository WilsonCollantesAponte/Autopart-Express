import { Hero } from "@/components";
import Image from "next/image";
import Nav from "./client/form/nav/page";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Nav />
      <Hero />
    </main>
  );
}
