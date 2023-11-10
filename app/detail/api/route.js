import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const idProduct = request.nextUrl.searchParams.get("idProduct");

  const response = await DataBaseInteraction.review.findMany({
    where: {
      idProduct,
    },
  });

  return NextResponse.json(response);
}

export async function POST(request) {
  const { emailClient, idProduct, comment } = await request.json();

  const response = await DataBaseInteraction.review.create({
    data: {
      emailClient,
      idProduct,
      comment,
    },
  });

  return NextResponse.json(response);
}

export async function PUT(request) {
  return NextResponse.json();
}

export async function DELETE(request) {
  return NextResponse.json();
}
