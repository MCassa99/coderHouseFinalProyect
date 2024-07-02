import swaggerJSDoc from 'swagger-jsdoc';
import { __dirname } from '../path.js';

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Documentación de mi E-Commerce API',
            version: '1.0.0',
            description: 'Documentacion de la API de E-Commerce para el Proyecto Final del curso de Desarrollo Web Full Stack de Coderhouse',
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

export const specs = swaggerJSDoc(swaggerOptions);
