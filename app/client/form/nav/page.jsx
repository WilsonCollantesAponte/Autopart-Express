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
        if(storeUserGmail) {
            setFormData(JSON.parse(storeUserGmail));
        }
        if(storeUser) {
            setFormData(JSON.parse(storeUser));
        }
    }
    , []);

    const handleLogout = async() => {
        localStorage.removeItem('user');
        localStorage.removeItem('formData');
        await signOut({callbackUrl: "/home",});
        setFormData(null);
    }




    return(

        
        <nav className="w-full bg-gray-200 shadow">
        <div className="flex justify-between items-center w-full px-4 text-white">
            <Link href="/client/form/signIn"> Register</Link>
            <Link href="/"> inicio</Link>
            <Link href="/client/form/about"> About</Link>
            {session?.user? (<div>
            <p>
                {session.user.name} {session.user.email}
                <img src={session.user.image} alt="user image"/>
            </p>
            <button onClick={handleLogout}>Logout</button>
            </div>
            ):
            (<button>
                <Link href="/client/form/signIn">
                 Sign In
                </Link> 
            </button>
            )}
        </div>
        </nav>
    )
}