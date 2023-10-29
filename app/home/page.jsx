// import { Footer, Navbar } from '@/components'
import ProductsCards from "@/components/ProductsCards";
// import React from "react";
// import Nav from '../client/form/nav/page';
import Filters from "@/components/Filters";

const Home = () => {
  return (
    <div>
      {/* <Nav></Nav> */}
      <Filters></Filters>
      <ProductsCards />
    </div>
  );
};

export default Home;
