import { NextRequest , NextResponse } from "next/server";
import DataBaseInteraction from "@/prisma";

export async function PUT(request)  {
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
}



