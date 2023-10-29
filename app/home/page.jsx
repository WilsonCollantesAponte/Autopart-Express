import { parts } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className="container bg-gray-body mx-auto py-36 px-8 justify-center">
        <div className="grid  w-auto  lg:grid-cols-3 gap-10">
          {parts.map((autopart, index) => (
            <div key={index} className="shadow-2xl rounded-lg max-w-xs h-96">
              <Image
                src={autopart.img}
                alt="imagen1"
                width={200}
                height={300}
                className="w-full h-2/3 rounded-t-lg p-8"
              />
              <div className="pb-2 mt-3 ">
                <div className="px-5 pb-5 ">
                  <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">
                    {autopart.model}
                  </h3>
                </div>
                <div className="flex  items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900  ml-2">
                    ${autopart.price}
                  </span>
                  <button className="button mr-2 text-red-botton border-2 border-red-botton font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <Link href={"/"}>Comprar</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
