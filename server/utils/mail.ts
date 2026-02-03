import nodemailer from "nodemailer";
import "dotenv/config";
import ejs from "ejs";
import path from "path";

interface Options {
  subject: string;
  email: string;
  template: string;
  data: Record<string, any>;
}

export const sendMail = async (options: Options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER || "smtp-relay.brevo.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_LOGIN,
      pass: process.env.SMTP_PASSWORD,
    },
    logger: true,
    debug: true,
  });

  const { subject, email, data, template } = options;
  const templatePath = path.join(__dirname, "../mail", template);
  const html = await ejs.renderFile(templatePath, { data });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
