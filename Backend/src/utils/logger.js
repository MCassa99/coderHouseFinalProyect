import winston from 'winston';

const customLevelOptions = {
     levels: {
          fatal: 0,
          error: 1,
          warning: 2,
          info: 3,
          http: 4,
          debug: 5
     },
     colors: {
          fatal: 'red',
          error: 'orange',
          warning: 'yellow',
          info: 'blue',
          http: 'magenta',
          debug: 'green'
     }
}

const logger = winston.createLogger({
     levels: customLevelOptions.levels, //Implementing custom levels
     transports: [
          new winston.transports.Console({
               level: 'info',
               format: winston.format.combine(
                    winston.format.colorize({ color: customLevelOptions.colors }), //Colorizing the output
                    winston.format.simple()
               )
          }),
          new winston.transports.File({
               level: 'warning',
               filename: './logs/warning.log',
               format: winston.format.simple()
          }),
          new winston.transports.File({
               level: 'error',
               filename: './logs/error.log',
               format: winston.format.simple()
          }),
          new winston.transports.File({
               level: 'fatal',
               filename: './logs/fatal.log',
               format: winston.format.simple()
          }),
          new winston.transports.File({
               level: 'http',
               filename: './logs/http.log',
               format: winston.format.simple()
          }),
     ]
});

export const addLogger = (req, res, next) => {
     req.logger = logger;
     req.logger.info(`${req.method} es ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
     next();
}