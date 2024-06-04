import { Router } from 'express';
//import { CartManager } from '../config/cartManager.js'; /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
/*import { cartModel } from '../models/cart.js'; /* Mis Productos ahora dependen de la el Controllador, no de el modelo */
import { createCart, getCartById, addProductToCart, deleteProductFromCart, deleteCart, createTicket } from '../controllers/cartController.js';

//const cartManager = new CartManager('./src/data/cart.json'); /* Mis Productos ahora dependen de la base de datos, no de un archivo json */
const cartRouter = Router();

//Crear un carrito
cartRouter.post('/', createCart);

//Listar todos los productos
cartRouter.get('/:cid', getCartById);

//Agregar un producto al carrito
cartRouter.post('/:cid/: pid', addProductToCart);

//Creo Ticket de compra
cartRouter.post('/:cid/purchase', createTicket);

//SE AGREGARON A PARTE DE LO PEDIDO ESTOS 2 ENDPOINTS
//Eliminar un producto del carrito
cartRouter.delete('/:cid/:pid', deleteProductFromCart);

//Vaciar carrito
cartRouter.delete('/:cid', deleteCart);

export default cartRouter;