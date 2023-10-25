import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request , {params}) {
    try {
      const product = await DataBaseInteraction.product.findUnique({
        where: {
            id: params.id
        }
      });

      return NextResponse.json({ product });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
