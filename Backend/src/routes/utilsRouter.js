import { Router } from "express";
import { compress } from "../utils/compress.js";
import { createRandomProducts } from "../utils/faker.js";

const utilsRouter = Router();

utilsRouter.get('/compress', compress);

utilsRouter.get('/mockingproducts', createRandomProducts);

export default utilsRouter;