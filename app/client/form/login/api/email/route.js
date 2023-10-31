import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let email = searchParams.get("email");

    const client = await DataBaseInteraction.client.findMany({
      where: {
        email: email,
      },
    });

    return NextResponse.json({ client });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
