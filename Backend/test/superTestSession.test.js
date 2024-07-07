import * as chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import varenv from "../src/dotenv.js";

const expect = chai.expect;

//Conexión a la base de datos
await mongoose
     .connect(`${varenv.mongodb}`)
     .then(() => {
          console.log("Conexión a la base de datos exitosa");
     })
     .catch((error) => {
          console.log("Error al conectarse a la base de datos: " + error);
     });

const requester = supertest("http://localhost:3000");

describe("Test de sesiones de usuarios (Register, Login, Current) /api/session", function () {
     let user = { email: "usuario@prueba.com", password: "passwordPrueba" };
     let cookie = {};
     it("Crear un usuario mediante el metodo POST", async () => {
          const newUser = {
               first_name: "Usuario",
               last_name: "Prueba",
               age: 20,
               email: "usuario@prueba.com",
               password: "passwordPrueba",
          };
          const { statusCode, _body } = await requester
               .post("/api/session/register")
               .send(newUser);
          user.email = _body.user.email;
          user.password = newUser.password;
          //console.log('Usuario creado: ', _body.user.email);
          expect(statusCode).to.be.equal(201);
     });

     it("Loguear un usuario mediante el metodo GET", async () => {
          //console.log('Usuario: ', user);
          const result = await requester.get("/api/session/login").send(user);
          const cookieResult = result.headers["set-cookie"][0];

          cookie = {
               name: cookieResult.split("=")[0],
               value: cookieResult.split("=")[1].split(";")[0],
          };

          expect(cookie.name).to.be.ok.and.equal("coderCookie");
          expect(cookie.value).to.be.ok;
     });

     it("Obtener el usuario logueado mediante el metodo GET", async () => {
          //console.log('Cookie: ', cookie);
          const { _body } = await requester
               .get("/api/session/current")
               .set("Cookie", [`${cookie.name} = ${cookie.value}`]);

          console.log("Usuario logueado: ", _body.user.email);

          expect(_body.user.email).to.be.equal(user.email);
     });

     it("Cerrar la sesión del usuario mediante el metodo GET", async () => {
          const { statusCode } = await requester
               .get("/api/session/logout")
               .set("Cookie", [`${cookie.name} = ${cookie.value}`]);

          expect(statusCode).to.be.equal(200);
     });

     it("Eliminar el usuario mediante el metodo GET", async () => {
          const { statusCode } = await requester
               .get("/api/session/deleteUser")
               .send(user)

          expect(statusCode).to.be.equal(200);
     });
});
