import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gris-oscuro text-white">
      <div className="container mx-auto p-8 flex flex-col md:flex-row justify-between items-start">
      
        <div className="mb-4 md:mb-0">
          <img src='/autoexpress-sinfondo.png' alt="Logo" className="h-16 w-auto" />
        </div>
        
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">INFORMACIÓN</h3>
          <p>Acerca de <Link href="/acerca">Autopart-Express</Link></p>
        </div>
        
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">CONTACTO</h3>
          <p><Link href="/contacto">Integrantes</Link></p>
        </div>
      </div>
      
    
      <hr className="border-white border-t mx-auto w-4/5" />
      
      <div className="text-center py-4">
        Autopart-Express 2023 Todos los derechos reservados &copy;
      </div>
    </footer>
  );
};

export default Footer;
