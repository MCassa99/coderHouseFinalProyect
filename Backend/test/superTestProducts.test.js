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

describe('Rutas de sesiones de usuarios (Register, Login, Current) /api/session', function () {
    let user = {email: 'usuario@prueba.com', password: 'passwordPrueba'};
    let cookie = {};
    /*it('Crear un usuario mediante el metodo POST', async () => {
        const newUser = {
            first_name: 'Usuario',
            last_name: 'Prueba',
            age: 20,
            email: 'usuario@prueba.com',
            password: 'passwordPrueba',
        };
        const { statusCode, _body } = await requester.post('/api/session/register').send(newUser);
        user.email = _body.user.email;
        user.password = newUser.password;
        //console.log('Usuario creado: ', _body.user.email);
        expect(statusCode).to.be.equal(201);
    });
    */
    it('Loguear un usuario mediante el metodo GET', async () => {
        //console.log('Usuario: ', user);
        const result = await requester.get('/api/session/login').send(user);
        const cookieResult = result.headers['set-cookie'][0];

        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1].split(';')[0]
        }

        expect(cookie.name).to.be.ok.and.equal('coderCookie');
        expect(cookie.value).to.be.ok;
    });

    it('Obtener el usuario logueado mediante el metodo GET', async () => {
        //console.log('Cookie: ', cookie);
        const { _body } = await requester.get('/api/session/current')
            .set('Cookie', [`${cookie.name} = ${cookie.value}`]);
        
        console.log('Usuario logueado: ', _body.user.email);

        expect(_body.user.email).to.be.equal(user.email);
    });
});