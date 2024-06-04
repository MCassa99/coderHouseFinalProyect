import passport from "passport";

export const login = async (req, res) => {
     try {
          console.log(req.user);
          if (!req.user){
               res.status(401).send('Usuario o contraseña incorrectos');
          } else {
               req.session.user = {
                    email: req.user.email,
                    first_name: req.user.first_name
               }
               res.status(200).send('Logueado correctamente');
          }
     } catch (error) {
          res.status(500).send('Error al loguearse');
     }
}

export const githubSession = async (req, res) => {
     req.session.user = {
          email: req.user.email,
          first_name: req.user.name
     }
     res.redirect('/');
}

export const register = async (req, res) => {
     try {
          if (!req.user){
               res.status(400).send('Usuario o contraseña incorrectos');
          } else {
               res.status(200).send('Usuario creado correctamente');
          }
     } catch (error) {
          res.status(500).send('Error al crear usuario');
     }
}

export const current = async (req, res) => {
     if (req.session.user){
          res.status(200).send(req.session.user);
     } else {
          res.status(401).send('No hay usuario logueado');
     }
}

export const logout = async (req, res) => {
     req.session.destroy((error => 
          error ? res.status(500).send('Error al cerrar la sesion') : res.status(200).redirect('/')   
     ));
}    

export const testJWT = async (req, res) => {
     res.status(200).send(req.user);
}