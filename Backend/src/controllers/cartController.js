import { cartModel } from '../models/cart.js';
import { productModel } from '../models/product.js';
import ticketModel from '../models/ticket.js';
import crypto from "crypto";

export const createCart = async (req, res) => {
     try {
          const createdCart = await cartModel.create({ products: [] });
          res.status(201).send(createdCart);
     } catch (error) {
          req.logger.fatal('Error al crear carrito ', error);
          res.status(500).send('Error al crear carrito ', error);
     }
}

export const getCartById = async (req, res) => {
     try {
          const cartID = req.params.cid;
          const cart = await cartModel.findOne({ _id: cartID })
          /*const productsCart = products.map(product => product.id_prod.toJSON());
          return res.status(200).render('templates/cart', {
               mostrarCarrito: true,
               products: productsCart,
               css: 'cart.css'
          });*/
          return res.status(200).send(cart);
     } catch (error) {
          return res.status(500).send('Error interno del servidor al mostrar el carrito');
     }
}

export const addProductToCart = async (req, res) => {
     try {
          //if (req.user.role == 'User') {
               const cartID = req.params.cid;
               const productID = req.params.pid;
               const { quantity } = req.body;
               const cart = await cartModel.findById(cartID);
               // Si el producto ya existe en el carrito, se incrementa la cantidad
               const index = cart.products.findIndex(product => product.id_prod._id == productID);

               if (index != -1) {
                    cart.products[index].quantity += quantity;
               }
               // Si no existe, se agrega al carrito
               else {
                    cart.products.push({ id_prod: productID, quantity: quantity });
               }
               await cartModel.findByIdAndUpdate(cartID, cart);         
               const newCart = cartModel.findById(cartID);
               res.status(200).send(newCart);
          //} else {
          //     res.status(401).send('Usuario no autorizado');
          //}
     } catch (error) {
          console.log(error);
          res.status(500).send('Error interno del servidor al agregar el producto' + error);
     }
}

export const createTicket = async (req, res) => {
     //Consulto stock de todos los productos antes de crear el ticket
     try {
          const cartID = req.params.cid;
          const cart = await cartModel.findById(cartID);
          let prodNoStock = [];
          if (cart) {
               cart.products.forEach(async (product) => {
                    let productDB = await productModel.findById(product.id_prod);
                    if (productDB.stock < product.quantity) {
                         prodNoStock.push(productDB);
                    }
               });
               if (prodNoStock.length == 0) {
                    console.log(cart.products);
                    const aux = [...cart.products];
                    //Creo ticket
                    const newTicket = await ticketModel.create({
                         code: crypto.randomUUID(),
                         amount: cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0),
                         purchaser: req.user.email,
                         products: cart.products
                    });
                    //Actualizo stock de los productos
                    cart.products.forEach(async (product) => {
                         let productDB = await productModel.findById(product.id_prod);
                         productDB.stock -= product.quantity;
                         await productModel.findByIdAndUpdate(product.id_prod, productDB);
                    });
                    //Vacio carrito
                    await deleteCart(cartID);
                    res.status(200).send(newTicket);
               } else {
                    console.log('No hay stock suficiente para los siguientes productos: ', prodNoStock);
                    prodNoStock.forEach((productID) => {
                         //[{id_prod, quantity}, {id_prod, quantity}, {id_prod, quantity}]
                         cart.products = cart.products.filter(product => product.id_prod !== productID);
                    })
                    await cartModel.findByIdAndUpdate(cartID, {
                         products: cart.products
                    });
                    req.logger.info('No hay stock suficiente para los siguientes productos: ', prodNoStock);
                    res.status(400).send('No hay stock suficiente para los siguientes productos: ', prodNoStock);
               }
          } else {
               req.logger.error('Carrito no encontrado');
               res.status(404).send('Carrito no encontrado');
          }
     } catch (error) {
          req.logger.fatal('Error al crear ticket ', error);
          res.status(500).send('Error interno del servidor al crear el ticket' + error);
     }

}

export const deleteProductFromCart = async (res, req) => {
     try {
          const cartID = req.params.cid;
          const productID = req.params.pid;
          const cart = await cartModel.findById(cartID);
          const index = cart.products.findIndex(product => product.id_prod._id == productID);
          if (index != -1) {
               cart.products.splice(index, 1);
          }
          const deletedCart = await cartModel.findByIdAndUpdate(cartID, cart);

          return res.status(200).send(deletedCart);
     } catch (error) {
          return res.status(500).send('Error interno del servidor al eliminar el producto' + error);
     }
}

export const deleteCart = async (id) => {
     try {
          const cartID = req.params.cid;
          const deletedFullCart = await cartModel.findByIdAndDelete(cartID);
          return res.status(200).send("Carrito vaciado con exito");
     } catch (error) {
          return res.status(500).send('Error interno del servidor al vaciar el carrito' + error);
     }
}