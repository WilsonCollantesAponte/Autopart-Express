import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const idProduct = request.nextUrl.searchParams.get("idProduct");

  const response = await DataBaseInteraction.review.findMany({
    where: {
      idProduct,
    },
    orderBy: {
      order: "desc",
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
  const { idReview, comment } = await request.json();

  const response = await DataBaseInteraction.review.update({
    where: {
      id: idReview,
    },
    data: {
      comment,
    },
  });

  return NextResponse.json(response);
}

export async function DELETE(request) {
  const idReview = request.nextUrl.searchParams.get("idReview");

  const response = await DataBaseInteraction.review.delete({
    where: {
      id: idReview,
    },
  });

  return NextResponse.json(response);
}
