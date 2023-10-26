import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, surname, email, password } = await request.json();

  const aNewClient = await DataBaseInteraction.client.create({
    include: {
      Accessibility: true,
    },
    data: {
      name,
      surname,
      email,
      password,
      Accessibility: {
        create: {
          status: true,
        },
      },
    },
  });

  return NextResponse.json({ aNewClient });
}
