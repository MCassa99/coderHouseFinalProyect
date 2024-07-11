import varenv from './dotenv.js';
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import messageModel from './models/messages.js'
import appRouter from './routes/appRouter.js';
import initializePassport from './config/passport/passport.js'
import passport from 'passport'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
import Template from 'handlebars'
import compression from 'compression'
import cors from 'cors'
//import { addLogger } from './utils/logger.js';


//Config
const app = express();
const PORT = 3000;

//Cors
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));


//Server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

const io = new Server(server);

//Conexión a la base de datos
mongoose.connect(varenv.mongodb)
    .then(() => { console.log('Conexión a la base de datos exitosa'); })
    .catch((error) => { console.log('Error al conectarse a la base de datos: ' + error); });

//Middlewares
app.use(express.json());
//Compress all responses
//Exchanges CPU time for smaller file sizes and faster transmission
app.use(compression({
    brotli: { enabled: true, zlib: { } }
}));
//Logger
//app.use(addLogger);

app.use(session({
    secret: varenv.sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ 
        mongoUrl: varenv.mongodb,
        ttl: 600, // 10 minutos
    })
}));

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser(varenv.cookieSecret));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//Routes
app.use('/', appRouter);
/*
//Cookies Routes
//Obtener cookie
appRouter.get('/getCookie', (req, res) => {
    res.send(req.signedCookies);
});
//Agregar cookie
appRouter.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una Cokie', { maxAge: 600000, signed: true }).send('Cookie creada');
});
//Borrar cookie
appRouter.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send('Cookie eliminada');
});

//Chat
const users = [];
//Socket io
io.on('connection', (socket) => {
    console.log('El socket se ha conectado con el id: ' + socket.id);

    socket.on('newUser', info => {
        users.push(info);
        console.log(users);
        socket.broadcast.emit('newUser', users);
        socket.emit('newUser', users);
    });

    socket.on('message', async (msg) => {
        try {
            await messageModel.create(msg);
            socket.broadcast.emit('messageLogs', msgs);
            socket.emit('messageLogs', msgs);
        } catch (error) {
            console.log('Error al enviar el mensaje: ' + error);
        }
    });
});

Template.registerHelper("log", function(something) {
    console.log(something);
});

*/