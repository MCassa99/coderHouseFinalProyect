import passport from "passport";
import { sendEmailChangePassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.js';
import { validateHash, createHash } from "../utils/bcrypt.js";

export const login = async (req, res) => {
     try {
          console.log(req.user);
          if (!req.user){
               res.status(401).send('Usuario o contraseña incorrectos');
          } else {
               req.session.user = {
                    email: req.user.email,
                    first_name: req.user.first_name
               }
               res.status(200).send('Logueado correctamente');
          }
     } catch (error) {
          res.status(500).send('Error al loguearse');
     }
}

export const githubSession = async (req, res) => {
     req.session.user = {
          email: req.user.email,
          first_name: req.user.name
     }
     res.redirect('/');
}

export const register = async (req, res) => {
     try {
          if (!req.user){
               res.status(400).send('Usuario ya existente en la aplicación');
          } else {
               res.status(200).send('Usuario creado correctamente');
          }
     } catch (error) {
          res.status(500).send('Error al crear usuario');
     }
}

export const current = async (req, res) => {
     if (req.session.user){
          res.status(200).send(req.session.user);
     } else {
          res.status(401).send('No hay usuario logueado');
     }
}

export const logout = async (req, res) => {
     req.session.destroy((error => 
          error ? res.status(500).send('Error al cerrar la sesion') : res.status(200).redirect('/')   
     ));
}    

export const testJWT = async (req, res) => {
     console.log("Desde testJWT" + req.user)
     if (req.user.role == 'User')
          res.status(403).send("Usuario no autorizado")
     else
          res.status(200).send(req.user)
}

export const sendPasswordChanger = async (req, res) => {
     try {
          const { email } = req.body;
          const user = await userModel.find({ email: email })
          if (user) {
               const token = jwt.sign({ userEmail: email }, 'coder', { expiresIn: '1h' })
               const resetLink = `http://localhost:3000/api/session/resetPassword/${token}`;
               sendEmailChangePassword(email, resetLink);
               res.status(200).send('Se envio un mail para cambiar la contraseña')
          } else
               res.status(404).send('Usuario no encontrado');
     } catch (error) {
          res.status(500).send('Error al cambiar la contraseña: ', error);
     }
}

export const resetPassword = async (req, res) => {
     const { token } = req.params;
     const { newPassword } = req.body;
     try {
          const validateToken = jwt.verify(token, 'coder');
          const user = await userModel.findOne({ email: validateToken.userEmail });
          if (user) {
               if (!validateHash(newPassword, user.password)) {
                    const hashPassword = createHash(newPassword);
                    user.password = hashPassword;
                    await userModel.findByIdAndUpdate(user._id, user);
                    res.status(200).send('Contraseña cambiada correctamente');
               } else {
                    res.status(400).send('La contraseña es igual a la anterior');
               }
          } else {
               res.status(404).send('Usuario no encontrado');
          }
     } catch (error) {
          res.status(500).send('Error al cambiar la contraseña: ', error);
     }
}