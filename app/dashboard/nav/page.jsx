import Link from "next/link";

export default function Nav(){
    return(
        <div>
            <Link href="/">Incio</Link>
            <Link href="/dashboard/login">Login</Link>
            <Link href="/dashboard/register">Register</Link>

        </div>
    )
}