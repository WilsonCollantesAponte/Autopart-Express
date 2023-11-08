import DataBaseInteraction, { cart } from "@/prisma";
import { NextResponse } from "next/server";


export async function PUT(request) {
    try {
      const { id_cart , payment_id } = await request.json();
      console.log("esto" , id_cart)  
        const idCart = id_cart.slice(1,-1).split(',').map((item) => item.replace(/"/g, ''));;
        console.log(idCart)
        for(const cartid of idCart){
            await DataBaseInteraction.cart.update({     
              where:{id: cartid},
              data:{payment_id: payment_id}
            })
        }
        return NextResponse.json("cambio exitoso");

  } catch (error) {
    console.log(error)
    return NextResponse.json({error: error.message});
    
  }
}