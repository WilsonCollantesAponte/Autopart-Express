import { sendEmail } from "@/components/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.text(); 

  try {
    const { to, subject, text } = JSON.parse(body); 
    const response = await sendEmail(to, subject, text);
    return NextResponse.json({ message: 'Correo enviado correctamente', response });
  } catch (error) {
    return NextResponse.json({ message: 'Error al enviar el correo', error: error.message }, { status: 500 });
  }
}


