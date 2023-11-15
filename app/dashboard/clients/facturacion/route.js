import DataBaseInteraction, { product } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const idClient = request.nextUrl.searchParams.get("idClient");

  try {
      const Compras = await DataBaseInteraction.cart.findMany({
        where: {
          idClient,
          status: false,
        },
      });
      
      const DataCompras = {};
      
      for(const compra of Compras){
        const paymentId = compra.payment_id;
        
        if(!DataCompras[paymentId]){
          
          DataCompras[paymentId] = {
            payment_Id: compra.payment_id,
            idClient: compra.idClient,
            products:[], 
            dispatch: compra.dispatch,
            feedback: compra.feedback,
            date: compra.date,
            total: 0,
          }
        }
        
        const DataProducto = await DataBaseInteraction.product.findUnique({
          where: {
            id: compra.idProduct,
          },
        });
        
        DataCompras[paymentId].products.push({
          id: DataProducto.id,
          name: DataProducto.name,
          brand: DataProducto.brand,
          model: DataProducto.model,
          image: DataProducto.image,
          price: DataProducto.price,
          quantity: compra.quantity
        })

        const total = DataCompras[paymentId].total + (DataProducto.price * compra.quantity);

        DataCompras[paymentId] = {
          ...DataCompras[paymentId],
            total: total,
        }
       
      }
    
      return NextResponse.json(DataCompras);
    
  } catch (error) {
    return NextResponse.json({error});
    
  }
}
