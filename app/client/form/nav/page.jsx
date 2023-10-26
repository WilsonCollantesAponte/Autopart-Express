'use client'


import Link from "next/link";
import { use, useState } from "react";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

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

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('formData');
        signOut();
        setFormData(null);
    }




    return(

        

        <div>
            
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
            (
                <Link href="/api/auth/signin">Sign in</Link>
            )}
        </div>
    )
}