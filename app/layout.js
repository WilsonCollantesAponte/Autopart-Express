import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import Nav from "./client/form/nav/page";
import { CartProvider } from "./context/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Autopart-Express",
  description: "e-shop autoparts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <CartProvider>
        <body className={`bg-gray-body ${inter.className}`}>
          <Nav />
          {children}
          <Footer />
        </body>
        </CartProvider>
      </Providers>
    </html>
  );
}
