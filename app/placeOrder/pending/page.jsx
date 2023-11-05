import React from 'react'

function page() {
  return (
    <div>
        <section class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
         <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
         {
          email? (
            <div>
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Su pago esta pendiente de confirmacion. {email}</h1>
            </div>
          ):(
            <p>loading...</p>
          )
         }
          
          </div>
          <Link href='/home'>
            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
             seguir comprando
            </button>
          </Link>
         </div>   
      </section>
    </div>
  )
}

export default page