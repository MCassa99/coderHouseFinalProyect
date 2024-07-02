import express, { Router } from 'express';
import productRouter from './productsRouter.js';
import cartRouter from './cartRouter.js';
import chatRouter from './chatRouter.js';
import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';
import mailRouter from './mailRouter.js';
import { __dirname } from '../path.js';
import multerRouter from './multerRouter.js';
import utilsRouter from './utilsRouter.js';
import docsRouter from './docsRouter.js';

//Config
const appRouter = Router();

//Routes
appRouter.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API de E-Commerce');
});
appRouter.use('/public', express.static(__dirname + '/public'));
appRouter.use('/upload', multerRouter);

appRouter.use('/api/products', productRouter, express.static(__dirname + '/public'));
appRouter.use('/api/chat', chatRouter, express.static(__dirname + '/public'));
appRouter.use('/api/cart', cartRouter);
appRouter.use('/api/users', userRouter);
appRouter.use('/api/session', sessionRouter);
appRouter.use('/api/mail', mailRouter);
appRouter.use('/api/utils', utilsRouter);
appRouter.use('/api/docs', docsRouter);

export default appRouter;