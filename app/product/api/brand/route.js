import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    const product = await DataBaseInteraction.product.findMany();

    //mapear los prod sacar las brand
    const brands = product.map(prod => prod.brand);
    const names = product.map(prod => prod.name);

    const brandArray = new Set(brands);
    
    const nameArray = new Set(names);

    let brandUnicos = [...brandArray]
    let nameUnicos = [...nameArray]

    return NextResponse.json({  nameUnicos , brandUnicos});
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
