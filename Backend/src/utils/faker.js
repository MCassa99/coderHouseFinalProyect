import { faker } from '@faker-js/faker'

const users = [];

//Mail, Password, Username, Id, Avatar, Image, Birthdate, registerDate
const createRandomUser = () => {
     const user = {
          email: faker.internet.email(),
          password: faker.internet.password(),
          username: faker.internet.userName(),
          userId: faker.datatype.uuid(),
          avatar: faker.image.avatarGitHub(),
          birthdate: faker.date.birthdate(),
          registerAt: faker.date.past(),
          loginAt: faker.date.recent(),
          biogram: faker.person.bio(),
          sex: faker.person.sex(),
          phone: faker.phone.number(),
          gender: faker.person.gender(),
     }
     users.push(user);
};

const products = [];

const createRandomProduct = () => {
     const product = {
          title: "Vuelo a Nueva York",
          description: "Nueva York es una ciudad emblemática de Estados Unidos, conocida como La ciudad que nunca duerme. La vuelta aérea por Nueva York es impresionante, con vistas panorámicas de la ciudad y el río Hudson. ",
          price: 500,
          category: "vuelos",
          code: "FLYNYC001",
          rating: 4.5,
          stock: 50,
          transshipment: 0,
          image: "https://www.interviajesny.com/wp-content/uploads/Vuelos-a-Nueva-York-.jpg"
     }
     products.push(product);
};

export const createRandomProducts = (req, res) => {
     for (let i = 0; i < 100; i++) {
          createRandomProduct();
     }
     res.status(200).send('Productos creados con exito');
};

//console.log(users);
