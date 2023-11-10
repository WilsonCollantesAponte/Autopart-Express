import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const idProduct = request.nextUrl.searchParams.get("idProduct");

  return NextResponse.json();
}

export async function POST(request) {
  return NextResponse.json();
}

export async function PUT(request) {
  return NextResponse.json();
}

export async function DELETE(request) {
  return NextResponse.json();
}
