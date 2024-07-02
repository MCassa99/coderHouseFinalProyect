import User from '../dao/classes/userDao.js';

const userService = new User();

export const getUsers = async (req, res) => {
     const user = await userService.getUsers();
     if (user == null)
          res.status(500).send("Error al obtener usuarios");
     else
          res.status(200).send(user);
}

export const getUserById = async (req, res) => {
     const { id } = req.params;
     const user = await userService.getUserById(id);
     if (user == null)
          res.status(500).send("Error al obtener usuario por id");
     else
          res.status(200).send(user);
}

export const createUser = async (req, res) => {
     const user = req.body;
     const newUser = await userService.createUser(user);
     if (newUser == null)
          res.status(500).send("Error al crear usuario");
     else
          res.status(200).send(newUser);
}