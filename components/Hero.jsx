'use client';
import Image from 'next/image'
import { CustomButton, Footer, Navbar } from '.'
import Link from 'next/link';

const Hero = () => {
    
  return (
  <>
    
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>
            Encuentra la calidad que tu vehículo merece.
        </h1>
        <p className='hero__subtitle'>
            Los mejores precios y variedad.
        </p>
        <Link href='/home'>
          <CustomButton
            title='Explora el sitio'
            containerStyles='bg-primary-blue text-white rounded-full mt-10'
           
           />
        </Link>
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
            <Image src='/autoparts1.png' alt='hero' 
            fill className='object-contain' />
        </div>
            {/* <div className='hero__image-overlay'/> */}

      </div>
    </div>
    
  </>
  
  )
}

export default Hero
