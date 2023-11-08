import DataBaseInteraction, { cart } from "@/prisma";
import { NextResponse } from "next/server";


export async function PUT(request) {
    try {
      const { id_cart , payment_id } = await request.json();
      console.log(typeof id_cart)
      if(id_cart.includes(',')){
        const idCart = id_cart.split(',');
        for(const cartid of idCart){
            await DataBaseInteraction.cart.update({
                
                    where:{id: cartid},
                    data:{payment_id: payment_id}
                
            })
        }
        return NextResponse.json("cambio exitoso");
      }else{
        const response = await DataBaseInteraction.cart.update({
            where: {
              id: id_cart,
            },
            data: {
              payment_id: payment_id,
            },
          });
        return NextResponse.json(response);

      }
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: error.message});
    
  }
}