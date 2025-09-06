import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"leetpulse - A LeetCode Tracker" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text, // optional fallback plain text
    html, // this renders HTML in the email
  });
}
