import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const email = request.nextUrl.searchParams.get("email");
  const password = request.nextUrl.searchParams.get("password");

  if (!email) return NextResponse.json({ message: "email can not be empty" });

  const userFound = await DataBaseInteraction.client.findMany({
    where: {
      email,
      password,
    },
    include:{
      Cart:{
        include:{
          Product:{
            select:{
              name:true,
              brand:true,
              model:true,
              image:true,
              price:true
            }
          }
        }
      },
      
    }
  });

  return NextResponse.json({ userFound });
}

export async function DELETE() {
  try {
    const deleteUsers = await DataBaseInteraction.client.deleteMany();
    return NextResponse.json({ deleteUsers });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
