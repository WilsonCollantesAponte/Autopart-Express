import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const allClients = await DataBaseInteraction.client.findMany();

  return NextResponse.json({ allClients });
}

export async function POST(request) {
  const { name, surname, email, password } = await request.json();

  const aNewClient = await DataBaseInteraction.client.create({
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

export async function PUT(request) {
  const idClient = request.nextUrl.searchParams.get("id");
  const { name, surname, email, password, status } = await request.json();

  const updatedClient = await DataBaseInteraction.client.update({
    include: {
      Accessibility: true,
    },
    where: {
      id: idClient,
    },
    data: {
      name,
      surname,
      email,
      password,
      Accessibility: {
        update: {
          status,
        },
      },
    },
  });

  return NextResponse.json({ updatedClient });
}

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
