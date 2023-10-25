import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await DataBaseInteraction.client.findMany();
    return NextResponse.json({ client });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
