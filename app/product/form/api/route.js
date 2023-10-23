import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { price, availability, brand, model, rating } = await request.json();

  const aNewProduct = await DataBaseInteraction.product.create({
    data: {
      price,
      availability,
      brand,
      model,
      rating,
    },
  });

  //   return NextResponse.json({ okNewPost: true });
  return NextResponse.json({ aNewProduct });
}
