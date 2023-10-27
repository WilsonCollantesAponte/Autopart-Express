'use client'
import Link from "next/link"
import Image from "next/image"
import { CustomButton } from "."

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between
      items-center  sm:px-16 px-6 py-4">
        <Link href='/' className="flex justify-center items-center">
            <Image
                src="/autoexpress.png"
                alt='Autopart-Express logo'
                width={118}
                height={18}
                className="object-contain"
            />
        </Link>
        <Link href="/client/form/signIn">
        
        <CustomButton
          title='Iniciar Sesion'
          btnType= 'button'
          containerStyles='text-primary-blue rounded-full
          bg-white min-w-[130px]'
        />
        </Link>
        

      </nav>
    </header>
  )
}

export default Navbar
