import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const idClient = request.nextUrl.searchParams.get("idClient");
  const idProduct = request.nextUrl.searchParams.get("idProduct");
  try {
    const response = await DataBaseInteraction.cart.findMany({
      where: {
        idClient,
        idProduct,
      },    
    });
  
    return NextResponse.json(response);

  } catch (error) {
    return NextResponse.json({error});
    
  }
}
