import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from '../../../models/user.js';
import varenv from '../../../dotenv.js';

const cookieExtractor = (req) => {
     const token = req.cookies ? req.cookies.jwtCookie : {};
     return token;
}

const jwtOptions = {
     jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), /* Extrae el token del header de la petición con Postman */
     //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), /* Extrae el token del header de la petición en el navegador */
     secretOrKey: varenv.jwtSecret /* Contraseña secreta para firmar el token */
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
     console.log('AAAAAAAAA')
     try {
          console.log('payload: ', payload.user._id);
          const user = await userModel.findById(payload.user._id);
          if (user) {
               return done(null, user);
          } else {
               return done(null, false);
          }
     } catch (error) {
          console.log('Error: ', error);
          return done(error, null);
     }
});