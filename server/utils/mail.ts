
import nodemailer from 'nodemailer';
import 'dotenv/config'
import ejs from 'ejs';
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Options {
    subject: string,
    email: string,
    template: string,
    data: Record<string, any>
}


export const sendMail = async(options:Options) => {
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
        logger: true,
        debug: true
    })


    const {subject, email, data, template} = options;
    const templatePath = path.join(__dirname,"../mail",template);
    const html = await ejs.renderFile(templatePath,{data});


    const mailOptions ={
        from: process.env.SMTP_EMAIL,
        to: email,
        subject,
        html
    }
  
    await transporter.sendMail(mailOptions);
}
