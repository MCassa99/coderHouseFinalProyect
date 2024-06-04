import { Router } from 'express';
import upload from '../config/multer.js';
import { insertImage } from '../controllers/multerController.js';

const multerRouter = Router();

multerRouter.post('/', upload.single('product'), insertImage);

export default multerRouter;