import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";



export async function PUT(request) {
    const idClient = request.nextUrl.searchParams.get("id");
 
    const updatedClient = await DataBaseInteraction.client.update({
      include: {
        Accessibility: true,
      },
      where: {
        id: idClient,
      },
      data: {
        type: 'admin'
          },
    });
  
    return NextResponse.json({ updatedClient });
  }