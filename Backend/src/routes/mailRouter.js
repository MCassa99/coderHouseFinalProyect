import { Router } from "express";
import { sendMail } from "../controllers/mailController.js";

const mailRouter = Router();

mailRouter.post('/sendMail', sendMail);

export default mailRouter;