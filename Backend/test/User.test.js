import mongoose from "mongoose";
import { userModel } from "../src/models/user.js";
import Assert from "assert";
import varenv from "../src/dotenv.js";

const assert = Assert.strict;

//Conexión a la base de datos
await mongoose.connect(`${varenv.mongodb}`)
    .then(() => { console.log('Conexión a la base de datos exitosa'); })
    .catch((error) => { console.log('Error al conectarse a la base de datos: ' + error); });

describe('test CRUD de usuarios en la ruta /api/users', function () {

    //Previo a comenzar el test 
    before(() => {
        console.log('- Inicio de las pruebas -');
    });
    
    //Previo a comenzar cada test
    beforeEach(() => {
        console.log('Inicio de prueba: ');
    });

    //Primer test para Users
    it('Obtener todos los usuarios mediante el metodo GET', async() => {
        const users = await userModel.find();
        assert.strictEqual(Array.isArray(users), true);
    });

    //Segundo test para Users
    it('Obtener un usuario por id mediante el metodo GET', async() => {
        const user = await userModel.findOne({ _id: '666108422d9e94f83518e78a' });
        //console.log('Usuario por id: ', user);
        //assert.strictEqual(typeof user, 'object');
        assert.ok(user._id);
    });

    //Tercer test para Users
    it('Crear un usuario mediante el metodo POST', async() => {
        const newUser = {
            first_name: 'Name',
            last_name: 'Surname',
            age: 20,
            email: 'name@surname.com',
            password: 'password1234',
            role: 'User'
        }
        const userCreated = await userModel.create(newUser);
        assert.ok(userCreated._id);
    });
    
    //Cuarto test para Users
    it('Actualizar un usuario por id mediante el metodo PUT', async() => {
        const updateUser = {
            first_name: 'NameUpdated',
            last_name: 'Surname',
            age: 20,
            email: 'name@surname.com',
            password: 'password1234',
            role: 'User'
        }
        const updatedUser = await userModel.findByIdAndUpdate('66842f8d60fac5d020424627', updateUser);
        assert.ok(updatedUser._id);
    });

    //Quinto test para Users
    it('Eliminar un usuario por id mediante el metodo DELETE', async() => {
        const userDeleted = await userModel.findByIdAndDelete('66842f8d60fac5d020424627');
        assert.strictEqual(typeof userDeleted, 'object');
    });
        
    //Después de terminar cada test
    afterEach(() => {
        console.log('Fin de prueba.\n');
    });

    //Después de terminar el test
    after(() => {
        console.log('Fin de las pruebas');
    });
});