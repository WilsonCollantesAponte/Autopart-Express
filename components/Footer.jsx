import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gris-oscuro text-black w-screen">
      <div className="container mx-auto p-8 flex flex-col md:flex-row justify-between items-start">
      
        <div className="mb-4 md:mb-0">
          <img src='/autoexpress-sinfondo.png' alt="Logo" className="h-10 w-auto" />
        </div>
        
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">INFORMACIÓN</h3>
          <p><Link className="hover:text-gray-200" href="/acerca">Acerca de Autoparts-Express</Link></p>
        </div>
        
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">CONTACTO</h3>
          <p><Link className="hover:text-gray-200" href="/contacto">Integrantes</Link></p>
        </div>
      </div>
      
    
      <hr className="border-blue-Nav border-t mx-auto w-4/5" />
      
      <div className="text-center py-4">
        Autoparts-Express 2023 Todos los derechos reservados &copy;
      </div>
    </footer>
  );
};

export default Footer;
