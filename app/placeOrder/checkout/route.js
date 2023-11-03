import {MercadoPagoConfig , Preference} from "mercadopago";
import { NextRequest , NextResponse } from "next/server";
const {NEXT_ACCES_TOKEN} = process.env;

const client = new MercadoPagoConfig({
    accessToken: NEXT_ACCES_TOKEN,
})
const payment = new Preference(client);

export async function POST(request) {
    
        try {
            const productos = await request.json();

            
            const arrayProductos = productos.map(producto => {
                return{
                    title: producto.name ,
                    quantity: producto.quantity, 
                    unit_price: producto.price, 
                    currency_id: "ARG"
                };
            }) 

             const URL = "http://localhost3000" //deveria https:// o el deploy 
               
            let preference = {
                body:{
                        items: arrayProductos,

                        back_urls: {
                        failure: `${URL}/placeOrder/status`,
                        pending: `${URL}/placeOrder/status`,
                        success: `${URL}/placeOrder/status`,
                        },
                       // notification_url: `${URL}/placeOrder/notify`, //crear el end point  
                    },
                    
                } 
              const response = await payment.create(preference);
             return NextResponse.json({url : response.init_point} );
        } catch (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
}

