import DataBaseInteraction from "@/prisma";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
const { MAIL_USERNAME, MAIL_PASSWORD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env

//por si no llega en .env sino eliminar esto
// const MAIL_USERNAME = 'autopartexpress14';
// const MAIL_PASSWORD ='expressauto123';
// const OAUTH_CLIENTID = '993793357757-6q11gshum3m7mfq443j84mgeqhmg5nrg.apps.googleusercontent.com'
// const OAUTH_CLIENT_SECRET = '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'
// const OAUTH_REFRESH_TOKEN = '1//04_nnCeQ9cCPLCgYIARAAGAQSNwF-L9IrPr8mzX636c8DxbTZn7Fmz_shf5bTdg4sOPasCsumMHSov8F_Ueg1YYvH07el9v7ivTg'

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

  // Configurar el transporte de Nodemailer
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
      clientId: OAUTH_CLIENTID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN
    }
  });
  // Crear el mensaje de bienvenida
  const welcomeMessage = {
    from: 'autopartexpress14@gmail.com',
    to: email,
    subject: '¡Bienvenido a la aplicación!',
    text: `Hola ${name}, ¡Bienvenido a nuestra aplicación! Gracias por registrarte.`,
  };

  
  

  // Enviar el correo de bienvenida
  transporter.sendMail(welcomeMessage, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo de bienvenida:', error);
    } else {
      console.log('Correo de bienvenida enviado:', info.response);
    }
  });



  return NextResponse.json({ aNewClient });
}

