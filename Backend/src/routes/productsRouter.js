import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
//import { ProductManager } from '../config/productManager.js'; /* Mis Productos ahora dependen de la base de datos, no de un archivo json */

//const productManager = new ProductManager('./src/data/products.json'); /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
const productRouter = Router();

//Listar todos los productos
productRouter.get('/', getProducts );

//Buscar un producto por ID
productRouter.get('/:id', getProductById );

//Agregar un producto
productRouter.post('/', createProduct );

//Modificar un producto
productRouter.put('/:id', updateProduct );

//Eliminar un producto
productRouter.delete('/:id', deleteProduct );

export default productRouter;