import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, surname, email, password } = await request.json();

  const aNewClient = await DataBaseInteraction.client.create({
    data: {
      name,
      surname,
      email,
      password,
    },
  });

  return NextResponse.json({ aNewClient });
}
