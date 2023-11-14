import mercadopago from "mercadopago";
import { NextRequest , NextResponse } from "next/server";
const {NEXT_ACCES_TOKEN} = process.env;

mercadopago.configure({
    access_token: NEXT_ACCES_TOKEN,
});

export async function POST(request) {
    
        try {
            const productos = await request.json();

            console.log(productos)
            const arrayProductos = productos.map(producto => {
                return{
                    id: producto.id,
                    picture_url: producto.image,
                    title: producto.name ,
                    quantity: producto.quantity, 
                    unit_price: producto.price, 
                    currency_id: "ARG"
                };
            }) 

             const URL = "https://64e7-181-209-91-123.ngrok-free.app" //http://localhost3000 deveria https:// o el deploy 
               
            let preference = {
     
                        items: arrayProductos,

                        back_urls: {
                        failure: `${URL}/home`,
                        pending: `${URL}/home`,
                        success: `${URL}/placeOrder/status`,
                        },
                       notification_url: `${URL}/placeOrder/notify`, //crear el end point  
                } 
               const response = await mercadopago.preferences.create(preference);
             return NextResponse.json({url: response.body.init_point});
        } catch (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
}

