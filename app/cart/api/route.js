import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const email = request.nextUrl.searchParams.get("email");

  const response = await DataBaseInteraction.cart.findMany({
    where: {
      Client: {
        email,
      },
    },
    include: {
      Product: true,
    },
  });

  return NextResponse.json(response);
}
export async function POST(request) {
  const { idClient, idProduct, payment_id } = await request.json();

  const response = await DataBaseInteraction.cart.create({
    data: {
      idClient,
      idProduct,
      payment_id,
    },
  });

  return NextResponse.json(response);
}
export async function PUT(request) {
  const { id, payment_id } = await request.json();

  const response = await DataBaseInteraction.cart.update({
    where: {
      id,
    },
    data: {
      payment_id,
    },
  });


  return NextResponse.json(response);
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  const response = await DataBaseInteraction.cart.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(response);
}
