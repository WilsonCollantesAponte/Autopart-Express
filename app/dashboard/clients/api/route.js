import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const idClient = request.nextUrl.searchParams.get("id");

  await DataBaseInteraction.cart.deleteMany({
    where: {
      idClient,
    },
  });

  const clientDeleted = await DataBaseInteraction.client.delete({
    where: {
      id: idClient,
    },
  });

  return NextResponse.json({ clientDeleted });
}
