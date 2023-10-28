'use client'
import { use, useState } from "react";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";


export default function Nav() {
    

    const {data: session} = useSession();


    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const storeUserGmail = localStorage.getItem('user');
        const storeUser = localStorage.getItem('formData');

        if (storeUserGmail) {
            setFormData(JSON.parse(storeUserGmail));
        } else if (session?.user) {
            setFormData(session.user); // Usar datos de la sesión si está disponible
        } else if (storeUser) {
            setFormData(JSON.parse(storeUser));
        }
    }, [session]);

    const handleLogout = async() => {
        localStorage.removeItem('user');
        localStorage.removeItem('formData');
        await signOut({callbackUrl: "/",});
        setFormData(null);
    }




    return(

        
        <nav className="w-full bg-gray-200 shadow}">
        <div className="flex justify-between items-center w-full px-4 text-white">
            <Link href="/"> inicio</Link>
            <Link href="/client/form/login"> Iniciar Sesion</Link>
            

            {formData ? (
                    <div>
                        <p>
                            Hola! {formData.email} {formData.surname}
                            {formData.image && (
                                <img src={formData.image} width="50" alt="user image" />
                            )}
                            
                        </p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button>
                        <Link href="/client/form/signIn">Registrarse</Link>
                    </button>
                )}
            
            <Link href="/client/form/about"> About</Link>
        </div>
        </nav>
    )
}