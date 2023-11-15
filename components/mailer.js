
import nodemailer from 'nodemailer';

const { MAIL_USERNAME, MAIL_PASSWORD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env;

const transporter = nodemailer.createTransport({
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

export function sendEmail(to, subject, text) {
  const emailMessage = {
    from: 'autopartexpress14@gmail.com',
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(emailMessage, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
