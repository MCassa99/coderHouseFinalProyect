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
          title: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price({ min: 100, max: 3000, dec: 0 }),
          category: faker.commerce.department(),
          status: faker.datatype.boolean(),
          code: faker.commerce.isbn(), //faker.commerce.product() + prod_id
          stock: faker.number.int({ min: 1, max: 15 }),
          image: faker.image.urlLoremFlickr(),
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
