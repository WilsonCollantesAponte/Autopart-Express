'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect , useState} from 'react'
import axios from 'axios'

let producto = [{
    name: "llanta",
    price: 30000,
    availability: 15,
    brand: "goodbrad",
    model: "ax 25",
    rating: 310,
    image: "https://th.bing.com/th/id/R.767f9d2a9ba6b3c691dc38afa5f9ba84?rik=1Nwem7j2letgWg&pid=ImgRaw&r=0",
      "quantity": 5
  },
  {
    name: "neumatico",
    price: 15000,
    availability: 15,
    brand: "goodbrad",
    model: "ax 25",
    rating: 310,
    image: "https://th.bing.com/th/id/R.767f9d2a9ba6b3c691dc38afa5f9ba84?rik=1Nwem7j2letgWg&pid=ImgRaw&r=0",
    quantity: 2
  }
  ]
function Boton() {
    const [url,setUrl] = useState()

    
    useEffect(()=>{
        const getURL= ()=>{
            try {
                  axios.post("/placeOrder/checkout",producto)
                .then(
                   ({data}) =>{
                       setUrl(data.url)
                   }
                )
            } catch (error) {
                console.log(error.message)
                console.log(error.response.data)
            }
        }
        getURL();
    },[])

  
  return (
    <div>
        <button>
            <Link href={`${url}`}>comprar</Link>
        </button>
    </div>
  )
}

export default Boton