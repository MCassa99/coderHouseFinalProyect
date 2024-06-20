#Establecer la imagen base
FROM node:20.11.0

#Establecer el directorio de trabajo
WORKDIR /_proyectofinalcoderhouse

#Variables de entorno
# MONGODB_URL= mongodb+srv://mcassa99:pruebaCoderHouse@cluster0.gudv9d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
# SALT= 12
# SESSION_SECRET= secret0000
# COOKIE_SECRET= secret0000
# JWT_SECRET= coderhouse
# EMAIL_USER= mcassa1999@gmail.com
# EMAIL_PASSWORD= xbrp emon leuv wzry

#Agrego argumentos de entorno, por defecto en desarrollo
ARG ENV_FILE = .env.development

#Comando para ejecutar el archivo .env de producción: docker build --build-arg ENV_FILE=.env.production -t proyectofinalcoderhouse .

#Copiar los archivos necesarios
COPY src ./Backend/src
COPY package*.json ./Backend
COPY $ENV_FILE ./Backend/.env

#Instalar dependencias
RUN npm install --prefix ./Backend

#Comando para iniciar mi aplicación
CMD ["node", "Backend/src/app.js"]

#Puerto que expongo
EXPOSE 3000

#Comando para construir la imagen: docker build -t proyectofinalcoderhouse .
#Comando para correr la imagen: docker run -p 3000:3000 app.js