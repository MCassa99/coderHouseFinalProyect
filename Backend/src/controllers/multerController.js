export const insertImage = async (req, res) => {
     try {
          console.log(req.file);
          console.log(req.body);
          res.status(200).send('Imagen subida con exito');
     } catch (error) {
          res.status(500).send('Error interno del servidor al subir la imagen');
     }
}