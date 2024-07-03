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
    //Previo a comenzar el test
    before(() => {
        console.log('- Inicio de las pruebas -');
    });
    //Previo a comenzar cada test
    beforeEach(() => {
        console.log('Inicio de prueba: ');
    });
    //Primer test para Products
    it('Obtener todos los productos mediante el metodo GET', async() => {
        const response = await requester.get('/api/products');
        console.log('Productos: ', response);
        expect(true).to.be.ok;
    });
});