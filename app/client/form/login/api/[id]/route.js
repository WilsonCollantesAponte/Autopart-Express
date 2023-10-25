import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const client = await DataBaseInteraction.client.findUnique({
    include: {
      Accessibility: true,
    },
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ client });
}
