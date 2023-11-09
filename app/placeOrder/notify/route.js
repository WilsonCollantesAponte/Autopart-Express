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
      console.log("payment",paymentId)
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
          /* console.log("extraer",arrayProductosVendidos[i])
          
          const cartId =  await DataBaseInteraction.cart.findMany({
            where: {
              payment_id: paymentId,
              idProduct: arrayProductosVendidos[i].id,
            },
          });
          console.log("cartId",cartId)
          const upQuantity = await DataBaseInteraction.cart.update({
            where: {
              id: cartId,
            },
            data: {
              quantity: arrayProductosVendidos[i].quantity,
            },
          });
            console.log(upQuantity) */
          const upAvailavility = producto.availability - arrayProductosVendidos[i].quantity;
          const productUp = await DataBaseInteraction.product.update({
            where: {
              id: producto.id,
            },
            data: {
              availability: upAvailavility.toString(),
            },
          });
          
        }
      }
    }

    return NextResponse.json("compra exitosa", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}



