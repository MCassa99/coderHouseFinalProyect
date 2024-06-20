import { Router } from "express";
import passport from "passport";
import { login, githubSession, register, current, logout, testJWT, sendPasswordChanger, resetPassword } from "../controllers/sessionController.js";

const sessionRouter = Router();

//Session Routes
//Obtener session
/*sessionRouter.get('/getSession', (req, res) => {
    
});
ESO GENERA LO MISMO QUE CURRENT POR LO QUE SE DEBE ELIMINAR
*/
//Agregar session
sessionRouter.get('/login', passport.authenticate('login'), login );

// Login form route
sessionRouter.get('/loginForm', (req, res) => {
    res.render('templates/login'); // Assuming you have a login template file named 'login.ejs'
});

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => { });

sessionRouter.get('/githubSession', passport.authenticate('github'), githubSession );

sessionRouter.get('/current', passport.authenticate('jwt'), current);

sessionRouter.post('/register', passport.authenticate('register'), register );

sessionRouter.get('/logout', logout );

sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: false }), testJWT);

sessionRouter.post('/changePassword', sendPasswordChanger);

sessionRouter.post('/resetPassword/:token', resetPassword);

export default sessionRouter;