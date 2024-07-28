import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/', userController.getUsers);

userRouter.get('/:id', userController.getUserById);

userRouter.put('/:id', userController.updateUser);

userRouter.post('/', userController.createUser);

userRouter.post('/:uid/documents', userController.sendDocuments)

userRouter.post('imagesProds', userController.sendImagesProds)

export default userRouter;