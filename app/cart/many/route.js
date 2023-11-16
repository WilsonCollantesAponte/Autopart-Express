import DataBaseInteraction, { cart } from "@/prisma";
import { NextResponse } from "next/server";


export async function GET(request) {
  const email = request.nextUrl.searchParams.get("email");

  const response = await DataBaseInteraction.cart.findMany({
    where: {
      Client: {
        email,
      },
    },
    include: {
      Product: true,
    },
  });

  return NextResponse.json(response);
}


export async function POST(request) {
  const { idClient, idProduct, payment_id , quantity, date} = await request.json();

  const cart = await DataBaseInteraction.cart.findMany({
    where:{
      idClient,
      idProduct,
    }
  })
  
  const verifica = cart.some(elemento => elemento.payment_id==payment_id)

  if(!verifica){
    const response = await DataBaseInteraction.cart.create({
      data: {
        idClient ,
        idProduct , 
        payment_id,
        status: false,
        quantity: Number(quantity),
        date,
      },
    });
  
    return NextResponse.json(response);
  }else{
    return NextResponse.json("payment ya creado");
  }

}


export async function PUT(request) {
    try {
      const { id_cart , payment_id , quantity , date} = await request.json();
       
      console.log(quantity)
        const idCart = id_cart.slice(1,-1).split(',').map((item) => item.replace(/"/g, ''));;
        const aux_quantity = quantity.slice(1,-1).split(',');
      console.log(aux_quantity)
        let i = 0;
        for(const cartid of idCart){
            await DataBaseInteraction.cart.update({     
              where:{id: cartid},
              data:{
                payment_id: payment_id,
                status: false,
                quantity: Number(aux_quantity[i]),
                date: date,
              }
            })
            i++;
        }
        return NextResponse.json("cambio exitoso");

  } catch (error) {
    console.log(error)
    return NextResponse.json({error: error.message});
    
  }
}