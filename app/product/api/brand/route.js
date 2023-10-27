import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    const product = await DataBaseInteraction.product.findMany();

    //mapear los prod sacar las brand
    const brands = product.map(prod => prod.brand)

    const brandArray = new Set(brands);
    console.log(brandArray)
    let brandUnicos = [...brandArray]

    return NextResponse.json({ brandUnicos });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
