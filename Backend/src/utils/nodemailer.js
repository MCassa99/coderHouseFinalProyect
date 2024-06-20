import nodemailer from 'nodemailer';
import varenv from '../dotenv.js';

const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
          user: 'mcassa1999@gmail.com',
          pass: 'tkwi xdhb xxin lvmq'
     }
})

export const sendEmailChangePassword = async (email, recoverLink) => {
     const mailOptions = {
          from: 'mcassa1999@gmail.com',
          to: email,
          subject: 'Recuperacion contraseña de la aplicación',
          text:
          `
          Haz click en el siguiente enlace para recuperar tu contraseña: ${recoverLink}
          `,
          html:
          `
               <h1>Recuperar contraseña</h1>
               <p>Para recuperar tu contraseña haz click en el siguiente enlace:</p>
               <button><a href=${recoverLink}>Recuperar contraseña</a></button>
          `
     }
     transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
               console.log('Error al enviar correo de cambio de Contraseña: ',error);
          } else {
               console.log('Email sent: ' + info.response);
          }
     })
}