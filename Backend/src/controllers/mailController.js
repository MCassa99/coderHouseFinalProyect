import varenv from '../dotenv.js';
import nodemailer from 'nodemailer'
import { __dirname } from '../path.js'

const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
          user: varenv.emailUser,
          pass: varenv.emailPassword
     }
})

export const sendMail = async (req, res) => {
     const { email, subject, text } = req.body;
     const mailOptions = {
          from: 'mcassa1999@gmail.com',
          to: email,
          subject: subject,
          text:
          `
          ${text}
          `,
          html:
          `
          <div>
               <h1>Test</h1>
               <p>${text}</p>
          </div>
          `
     }
     transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
               console.log('Error al enviar correo: ', error);
               res.send({ status: 500, message: 'Error al enviar correo: ', error });
          } else {
               console.log('Email sent: ' + info.response);
               res.send({ status: 200, message: 'Email sent: ' + info.response });
          }
     })
}