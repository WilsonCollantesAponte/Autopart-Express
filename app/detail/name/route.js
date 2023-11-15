import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const emailClient = request.nextUrl.searchParams.get("email");

  const response = await DataBaseInteraction.review.findMany({
    where: {
      emailClient,
    },
    orderBy: {
      order: "desc",
    },
  });

  return NextResponse.json(response);
}
