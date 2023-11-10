import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const idClient = request.nextUrl.searchParams.get("idClient");

  try {
      const response = await DataBaseInteraction.cart.findMany({
        where: {
          idClient,
          status: false,
        },
      });
    
      return NextResponse.json(response);
    
  } catch (error) {
    return NextResponse.json({error});
    
  }
}
