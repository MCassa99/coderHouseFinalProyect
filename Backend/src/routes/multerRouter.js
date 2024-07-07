import { Router } from 'express';
import { uploadDocs, uploadProducts, uploadProfiles} from '../config/multer.js';
import { insertImage } from '../controllers/multerController.js';

const multerRouter = Router();

multerRouter.post('/profiles', uploadProfiles.single('profile'), insertImage);
multerRouter.post('/documents', uploadDocs.single('doc'), insertImage);
multerRouter.post('/products', uploadProducts.single('product'), insertImage);


export default multerRouter;