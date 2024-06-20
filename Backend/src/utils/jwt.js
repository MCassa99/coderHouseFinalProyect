import jwt from 'jsonwebtoken';
import varenv from '../dotenv.js';

export const generateToken = (user) => {
     /*
          1: Objeto de asoaciación del token (Usuario)
          2: Contraseña secreta
          3: Tiempo de expiración del token
     */
     const token = jwt.sign({ user }, "coderhouse" , { expiresIn: '12h' });
     return token;
};

console.log(generateToken(
     {
          "_id": "666108422d9e94f83518e78a",
          "first_name": "Matias",
          "last_name": "Cassanello",
          "age": 24,
          "email": "mcassa1999@gmail.com",
          "password": "$2b$12$n2VxPGco91KrgWAfvGWR.OEy3Et/NTd6VEwLEGxdldxRqLUQ17UeW",
          "role": "Admin",
          "cart_id": "666108422d9e94f83518e78b",
          "__v": 0
     }
));


/*
     "_id": "661739a0111773eba9eae765",
     "first_name": "Francis",
     "last_name": "Fernandez",
     "password": "$2b$12$hN8/LhUsPQ8qZ7MmiJOXdeIsm.CzNKVEdhd48.p6dd3GFrWqdibty",
     "age": 28,
     "email": "francis@francis.com",
     "rol": "Admin",
     "cart_id": "661739a0111773eba9eae766",
     "__v": 0
*/