


import React from 'react'
import Image from 'next/image'



const ProductsCards = ({entries}) => {
  console.log('Esto es entries de  product cards:', entries)
  return (
    <div className='container mx-auto py-36 px-8 ' >
      <div className='grid lg:grid-cols-3 gap-10'>
        {entries.map((entry)=>(
          <div className='shadow-lg flex flex-col items-center' >
            <Image src={entry.image}
            alt='imagen1'
            width={200}
            height={200}
            className='object-contain'
            />
            <h3>{entry.name}</h3>
            <p>${entry.price}</p>
          </div>
       ))}
      </div>
    </div>
  )
}

export default ProductsCards


