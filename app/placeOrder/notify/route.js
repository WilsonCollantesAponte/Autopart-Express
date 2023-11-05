import mercadopago from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import DataBaseInteraction from "@/prisma";
const { NEXT_ACCES_TOKEN } = process.env;

mercadopago.configure({
  access_token: NEXT_ACCES_TOKEN,
});

export async function POST(request) {
  try {
    //const body = request.json();
    const { searchParams } = new URL(request.url);

    const topic = searchParams.get("topic") || searchParams.get("type");

    if (topic === "payment") {
      const paymentId = searchParams.get("id") || searchParams.get("data.id");
      let payment = await mercadopago.payment.findById(Number(paymentId));
      let paymentStatus = payment.body.status;
      
       //console.log([ paymentStatus ,  payment.body.additional_info.items ] )

      if (paymentStatus == "approved") {
        const arrayProductosVendidos = payment.body.additional_info.items;
        //console.log(arrayProductosVendidos)
        for (let i = 0; i < arrayProductosVendidos.length; i++) {
          const producto = await DataBaseInteraction.product.findUnique({
            where: {
              id: arrayProductosVendidos[i].id,
            },
          });
          console.log(producto);
          const upAvailavility = producto.availability - arrayProductosVendidos[i].quantity;
          const productUp = await DataBaseInteraction.product.update({
            where: {
              id: producto.id,
            },
            data: {
              availability: upAvailavility.toString(),
            },
          });
          console.log(productUp)
        }
      }
    }

    return NextResponse.json("compra exitosa", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

/* export async function PUT(request)  {
    try {
        const { searchParams } = new URL(request.url);
        let payment_id = searchParams.get("payment_id");
        let email = searchParams.get("email") // gamail y login

        const client = await DataBaseInteraction.client.findUnique({where: email})
        if(client){
            const cart = await DataBaseInteraction.cart.findFirst({where: {idClient: client.id}})
            if(cart){
                const upDate = await DataBaseInteraction.cart.update({
                    where: {id: cart.id},
                    data: {payment_id: payment_id}
                })
                return NextResponse.json(upDate, {status: 200 })
            }else throw new Error("este cliente no tien carrito de compras")
        }else throw new Error("no se encontro un cliente con ese email")
        
    } catch (error) {
        return NextResponse.json({error: error.message}) 
    }
} */
