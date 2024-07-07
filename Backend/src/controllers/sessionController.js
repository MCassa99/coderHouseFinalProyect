import passport from "passport";
import { sendEmailChangePassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.js';
import { validateHash, createHash } from "../utils/bcrypt.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import varenv from "../dotenv.js";
import { tr } from "@faker-js/faker";

export const login = async (req, res) => {
     try {
          const { email, password } = req.body;
          if (!email || !password) {
               res.status(400).send({ message: 'Error faltan ingresar datos.' });
          }
          const user = await userModel.findOne({ email: email });
          if (!user) {
               res.status(401).send({ message: 'El usuario no existe!' });
          }
          if (!validateHash(password, user.password)) {
               res.status(401).send({ message: 'Contraseña incorrecta!' });
          }
          
          req.session.user = {
               email: req.user.email,
               first_name: req.user.first_name,
               last_name: req.user.last_name,
               role: req.user.role,
               last_connection: req.user.last_connection
          }
          const userToken = generateToken(req.session.user);
          console.log("Usuario Logeado: ", req.session.user)
          //console.log("Usuario: ", user, "\nToken: ", userToken)
          res.status(200).cookie('coderCookie', userToken, { maxAge: 3600000 }).send({ message: 'Logueado correctamente', user: req.session.user, token: userToken});
          
     } catch (error) {
          res.status(500).send({ message: 'Error al loguearse' + error });
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
               res.status(400).send({ message: 'Usuario ya existente en la aplicación' });
          } else {
               res.status(201).send({ message: 'Usuario creado correctamente', user: req.user });
          }
     } catch (error) {
          res.status(500).send({ message: 'Error al crear usuario'+ error});
     }
}

export const current = async (req, res) => {
     try {
          const cookie = req.cookies['coderCookie']
          //console.log(cookie)
          const user = verifyToken(cookie).user;
          console.log("Usuario Logeado: ", user.email)
          if (user)
               return res.send({ message: 'Usuario logeado:', user: user });
          if (req.session.user) {
               res.status(200).send({ message: 'Usuario logeado:', user: req.session.user });
          } else {
               res.status(401).send({ message: 'No hay usuario logueado' });
          }
     } catch (error) {
          res.status(500).send({ message: 'Error al obtener usuario logueado' + error });
     }
}

export const logout = async (req, res) => {
     try {
          const user = await userModel.findOne({ email: req.session.user.email });
          user.last_connection = new Date();
          await user.save();
          res.clearCookie('coderCookie');
          console.log("Usuario Deslogueado: ", req.session.user.email)
          req.session.destroy((error =>
               error ? res.status(500).send({ message: 'Error al cerrar la sesion' }) : res.status(200).redirect('/')
          ));
     } catch (error) {
          res.status(500).send({ message: 'Error al cerrar la sesion, verifique que haya sesion iniciada' });
     }
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
               const token = jwt.sign({ userEmail: email }, varenv.emailRecovery, { expiresIn: '1h' })
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
          const validateToken = jwt.verify(token, varenv.emailRecovery);
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

export const deleteUser = async (req, res) => {
     const { email, password } = req.body;
     try {
          const user = await userModel.findOne({ email: email });
          if (user) {
               if (validateHash(password, user.password)) {
                    await userModel.findByIdAndDelete(user._id);
                    res.status(200).send('Usuario eliminado correctamente');
               } else {
                    res.status(400).send('Contraseña incorrecta');
               }
          } else {
               res.status(404).send('Usuario no encontrado');
          }
     } catch (error) {
          res.status(500).send('Error al eliminar usuario: ', error);
     }
}