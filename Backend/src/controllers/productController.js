import { productModel } from '../models/product.js';

export const getProducts = async (req, res) => {
     try {
          const { page, limit, filter, sort } = req.query;
          let letFilter;
          const actualPage = page != undefined ? page : 1;
          const limitPerPage = limit != undefined ? limit : 10;

          // Consulto si hay un filtro
          if (filter == 'true' || filter == 'false') {
               letFilter = 'status';
          } else {
               if (filter != undefined) {
                    letFilter = 'category';
               }
          }

          const query = letFilter ? { [letFilter]: filter } : {};
          const sortType = sort != undefined ? { price: sort } : {};

          // Consulto los productos con el filtro y paginacion
          const products = await productModel.paginate(query, { limit: limitPerPage, page: actualPage, sort: sortType });
          const productsJSON = products.docs.map(product => product.toJSON());

          res.status(200).render('templates/home', {
               mostrarProductos: true,
               productos: productsJSON,
               css: 'home.css'
          });
     } catch (error) {
          res.status(500).send('Error interno del servidor al listar los productos' + error)
               .render('templates/error', {
                    error: error
               });
     }
}

export const getProductById = async (req, res) => {
     try {
          const idProuducto = req.params.id;
          const product = await productModel.findById(idProuducto);
          if (product)
               // Deberia devolver 'Producto solicitado con id: ' + idProuducto + '\nEs: ' + product
               res.status(200).send(product);
          else
               res.status(404).send("El producto no existe");
     } catch (error) {
          res.status(500).send('Error interno del servidor al buscar el producto' + error);
     }
}

export const createProduct = async (req, res) => {
     try {
          const product = req.body;
          const createdProduct = await productModel.create(product);
          if (createdProduct)
               res.status(201).send({ message: "Producto creado con exito", product: createdProduct });
          else
               res.status(500).send({ message: "Error al crear producto" });
     } catch (error) {
          res.status(500).send({ message: "Error al crear producto" + error });
     }
}

export const updateProduct = async (req, res) => {
     try {
          const id = req.params.id;
          const product = req.body;
          const updatedProduct = await productModel.findByIdAndUpdate(id, product).lean();
          res.status(200).send({ message: "Producto modificado con exito", product: updatedProduct });
     } catch (error) {
          res.status(500).send({ message: "Error al modificar Producto" + error });
     }
}

export const deleteProduct = async (req, res) => {
     try {
          const id = req.params.id;
          const deletedProduct = await productModel.findByIdAndDelete(id);
          res.status(200).send({ mesagge: "Producto eliminado con exito", product: deletedProduct });
     } catch (error) {
          res.status(500).send({ message: "Error al eliminar producto" + error });
     }
}