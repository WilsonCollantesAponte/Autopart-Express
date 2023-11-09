import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    let idClient = request.nextUrl.searchParams.get("idClient");

    if (!idClient) idClient = "";

    const products = await DataBaseInteraction.product.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        Cart: {
          where: {
            idClient,
            status:true,
          },
        },
      },
    });
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { name, price, availability, brand, model, rating, image } =
    await request.json();

  const newProduct = await DataBaseInteraction.product.create({
    data: {
      name,
      price,
      availability,
      brand,
      model,
      rating,
      image,
    },
  });

  return NextResponse.json({ newProduct });
}

export const PUT = async (request) => {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const { name, price, availability, brand, model, rating, image } =
      await request.json();

    const productUp = await DataBaseInteraction.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        availability,
        brand,
        model,
        rating,
        image,
      },
    });
    return NextResponse.json(productUp, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    const id = request.nextUrl.searchParams.get("id");

    const result = await DataBaseInteraction.product.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
//
