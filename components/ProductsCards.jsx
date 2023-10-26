import React from 'react'
import { parts } from '@/constants'
import Image from 'next/image'



const ProductsCards = () => {
  return (
    <div className='container mx-auto py-36 px-8 justify-center' >
      <div className='grid lg:grid-cols-3 gap-10'>
        {parts.map((autopart)=>(
          <div className='shadow-lg flex justify-center' >
            <Image src={autopart.img}
            alt='imagen1'
            width={200}
            height={200}
            className='object-contain'
            />
            <h3>{autopart.model}</h3>
            <p>${autopart.price}</p>
          </div>
       ))}
      </div>
    </div>
  )
}

export default ProductsCards


