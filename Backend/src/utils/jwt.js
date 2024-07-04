import jwt from 'jsonwebtoken';
import varenv from '../dotenv.js';

export const generateToken = (user) => {
     /*
          1: Objeto de asoaciación del token (Usuario)
          2: Contraseña secreta
          3: Tiempo de expiración del token
     */
     const token = jwt.sign({ user }, varenv.jwtSecret , { expiresIn: '12h' });
     return token;
};

export const verifyToken = (token) => {
     return jwt.verify(token, varenv.jwtSecret);
}

const newToken = generateToken({
     "_id": "666108422d9e94f83518e78a",
     "first_name": "Matias",
     "last_name": "Cassanello",
     "age": 24,
     "email": "mcassa1999@gmail.com",
     "password": "$2b$12$4/tLkSlDB4Oal37BTrlhquJuSLFkIgasu1rjnNEq.LTDfoczasAoi",
     "role": "Admin",
     "cart_id": "666108422d9e94f83518e78b",
     "__v": 0
});
//console.log(newToken);

//console.log('Logeado como: '+verifyToken(newToken).user.email);


/*
     "_id": "6685fd5db722596693205284",
     "first_name": "Usuario",
     "last_name": "Prueba",
     "password": "$2b$12$FB8r4t9UnWXG375ksSfBZe5LjG04tr4ZVDDHP480J4W/UoQFmmH8m",
     "age": 20,
     "email": "usuario@prueba.com",
     "rol": "User",
     "cart_id": "6685fd5db722596693205285",
     "__v": 0
*/