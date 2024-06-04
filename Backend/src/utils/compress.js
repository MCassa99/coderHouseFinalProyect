
export const compress = async (req, res) => {
     try {
          let string = '';
          for (let i = 0; i < 10e5; i++) {
               string += 'Holaaaaa';
          }
          res.send(string);
     } catch (error) {
          res.status(500).send('Error interno del servidor al comprimir' + error);
     }
}