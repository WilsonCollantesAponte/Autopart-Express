import DatabaseInteraction from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET(request){
    try{
        const carts = await DatabaseInteraction.cart.findMany({
            where: {
                payment_id: { not: null },
            },
            orderBy: {
                date: "desc", 
            },
            include: {
                Client: {
                    select: {
                        name:true,
                        email: true,
                    }
                },
                Product: {
                    select: {
                        name: true,
                        brand: true,
                        model: true,
                        price: true,
                        image: true,
                    }
                }
            },
        });

        // const carts = cartsRaw.map(cart => ({
        //     ...cart,
        //     date: new Date(cart.date),
        // }));
        return NextResponse.json({carts})
    } catch(error){
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

