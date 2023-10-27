import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

// Bring all the products to show at home
export async function GET() {
  try {
    const products = await DataBaseInteraction.product.findMany();
    return NextResponse.json({ products }); 
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Redundant code - the same is in /dashboard/products/api
// export const PUT = async (request) => {
//   try {
//     const id = request.nextUrl.searchParams.get("id");
//     const { price, availability, brand, model, rating } = await request.json();

//     const productUp = await DataBaseInteraction.product.update({
//       where: {
//         id: id,
//       },
//       data: {
//         price: price,
//         availability: availability,
//         brand: brand,
//         model: model,
//         rating: rating,
//       },
//     });
//     return NextResponse.json(productUp, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

// export const DELETE = async (request) => {
//   try {
//     const id = request.nextUrl.searchParams.get("id");

//     const result = await DataBaseInteraction.product.delete({
//       where: {
//         id: id,
//       },
//     });
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// };
