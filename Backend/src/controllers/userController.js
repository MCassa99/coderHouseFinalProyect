import e from "express";
import User from "../dao/classes/userDao.js";

const userService = new User();

export const getUsers = async (req, res) => {
     const user = await userService.getUsers();
     if (user == null) res.status(500).send("Error al obtener usuarios");
     else res.status(200).send(user);
};

export const getUserById = async (req, res) => {
     const { id } = req.params;
     const user = await userService.getUserById(id);
     if (user == null) res.status(500).send("Error al obtener usuario por id");
     else res.status(200).send(user);
};

export const createUser = async (req, res) => {
     const user = req.body;
     const newUser = await userService.createUser(user);
     if (newUser == null) res.status(500).send("Error al crear usuario");
     else res.status(201).send(newUser);
};

export const sendDocuments = async (req, res) => {
     const { uid } = req.params;
     const newDocuments = req.body;
     const user = await userService.sendDocuments(uid, newDocuments);
     if (user == null || !user) res.status(404).send("Usuario no encontrado");
     else res.status(200).send(user);
};

export const sendImagesProds = async (req, res) => {
     const { uid } = req.params;
     const newImages = req.body;
     const user = await userService.sendImagesProds(uid, newImages);
     if (user == null || !user) res.status(404).send("Usuario no encontrado");
     else res.status(200).send(user);
}
