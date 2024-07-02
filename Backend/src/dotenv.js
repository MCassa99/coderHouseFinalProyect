import dotenv from 'dotenv';

dotenv.config();

const varenv = {
     nodeENV: process.env.NODE_ENV,
     host: process.env.HOST,
     port: process.env.PORT,
     mongodb: process.env.MONGODB_URL,
     salt: process.env.SALT,
     sessionSecret: process.env.SESSION_SECRET,
     cookieSecret: process.env.COOKIE_SECRET,
     jwtSecret: process.env.JWT_SECRET,
     emailUser: process.env.EMAIL_USER,
     emailPassword: process.env.EMAIL_PASSWORD
}

export default varenv;