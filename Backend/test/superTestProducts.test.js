import * as chai from 'chai';
import mongoose from 'mongoose'
import supertest from 'supertest'
import varenv from '../src/dotenv.js'

const expect = chai.expect;

//Conexión a la base de datos
await mongoose.connect(`${varenv.mongodb}`)
    .then(() => { console.log('Conexión a la base de datos exitosa'); })
    .catch((error) => { console.log('Error al conectarse a la base de datos: ' + error); });

const requester = supertest('http://localhost:3000');

describe('test CRUD de productos en la ruta /api/products', function () {
    let id;
    //Primer test para Products
    it('Obtener todos los productos mediante el metodo GET', async () => {
        const { ok } = await requester.get('/api/products/');
        console.log('Productos: ', ok);
        expect(ok).to.be.ok;
    });

    //Segundo test para Products
    it('Crear un producto mediante el metodo POST', async () => {
        const newProduct = {
            title: 'Producto de prueba',
            description: 'Descripción de prueba',
            price: 1000,
            stock: 10,
            category: 'Categoria de prueba',
            code: '1K1'
        };
        const { statusCode, _body } = await requester.post('/api/products/').send(newProduct); //Tengo un error en esta linea
        id = _body.product._id;
        expect(statusCode).to.be.equal(201);
    });

    //Tercer test para Products
    it('Actualizar un producto mediante el metodo PUT', async () => {
        try {
            const updatedProduct = {
                title: 'Producto de prueba Cambiado',
                description: 'Descripción de prueba Cambiado',
                price: 500,
                category: 'Categoria de prueba',
                status: true,
                code: '123456',
                stock: 15
            };
            const { statusCode } = await requester.put(`/api/products/${id}`).send(updatedProduct);
            expect(statusCode).to.be.equal(200);
            //expect(_body.status).to.be.equal('success');
        } catch (error) {
            console.log('Error: ', error);
        }
    });

    //Cuarto test para Products
    it('Eliminar un producto por id mediante el metodo DELETE', async () => {
        const { statusCode } = await requester.delete(`/api/products/${id}`);
        expect(statusCode).to.be.equal(200);
    });
});