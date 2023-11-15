import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";
import { sendEmail } from "@/components/mailer";

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

  
  

  //Notificacion x email de bienvenida
  try {
    // Enviar el correo de bienvenida
    //sendEmail(to, subject , text)
    const welcomeEmailResponse = await sendEmail(
      email,
      '¡Bienvenido a la aplicación!', 
      `Hola ${name}, ¡Bienvenid@ a nuestra aplicación! Gracias por registrarte.`);
    
      console.log('Correo de bienvenida enviado:', welcomeEmailResponse.response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }


  return NextResponse.json({ aNewClient });
}

