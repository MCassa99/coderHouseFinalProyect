import { Router } from 'express';
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from '../controllers/docsController.js';

const docsRouter = Router();

docsRouter.use('/', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

export default docsRouter;