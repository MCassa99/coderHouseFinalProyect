import { cartModel } from "../models/cart.js";
import { productModel } from "../models/product.js";
import ticketModel from "../models/ticket.js";
import crypto from "crypto";

export const createCart = async (req, res) => {
     try {
          const createdCart = await cartModel.create({ products: [] });
          res.status(201).send(createdCart);
     } catch (error) {
          console.error("Error al crear carrito: ", error);
          res.status(500).send("Error al crear carrito");
     }
};

export const getCartById = async (req, res) => {
     try {
          const cartID = req.params.cid;
          const cart = await cartModel.findOne({ _id: cartID });
          return res.send({ status: 200, cart: cart });
     } catch (error) {
          console.error(
               "Error interno del servidor al mostrar el carrito: ",
               error
          );
          return res
               .status(500)
               .send("Error interno del servidor al mostrar el carrito");
     }
};

export const addProductToCart = async (req, res) => {
     const { quantity } = req.body;
     try {
          if (quantity) {
               const cartID = req.params.cid;
               const productID = req.params.pid;
               const cart = await cartModel.findById(cartID);

               const index = cart.products.findIndex(
                    (product) => product.id_prod._id == productID
               );
               if (index != -1) {
                    cart.products[index].quantity += parseInt(quantity);
               } else {
                    cart.products.push({
                         id_prod: productID,
                         quantity: parseInt(quantity),
                    });
               }
               await cartModel.findByIdAndUpdate(cartID, cart);
               res.send({
                    status: 200,
                    message: "Producto agregado al carrito",
               });
          }
     } catch (error) {
          console.error(
               "Error interno del servidor al agregar el producto: ",
               error
          );
          res.send({
               status: 500,
               message: "Error interno del servidor al agregar el producto",
          });
     }
};

export const createTicket = async (req, res) => {
     try {
          const { email } = req.body;
          const cartID = req.params.cid;
          const cart = await cartModel.findById(cartID);
          let prodNoStock = [];

          if (cart) {
               for (const product of cart.products) {
                    let productDB = await productModel.findById(
                         product.id_prod
                    );
                    if (productDB.stock < product.quantity) {
                         prodNoStock.push(productDB);
                    }
               }

               if (prodNoStock.length === 0) {
                    // Validar los productos antes de calcular el monto
                    let totalAmount = 0;
                    for (const product of cart.products) {
                         const productDB = await productModel.findById(
                              product.id_prod
                         );
                         if (
                              !productDB ||
                              typeof productDB.price !== "number" ||
                              typeof product.quantity !== "number"
                         ) {
                              console.error(
                                   "Producto inválido encontrado en el carrito",
                                   product
                              );
                              return res
                                   .status(500)
                                   .send(
                                        "Error al procesar el carrito, producto inválido encontrado"
                                   );
                         }
                         totalAmount += productDB.price * product.quantity;
                    }

                    const newTicket = await ticketModel.create({
                         code: crypto.randomUUID(),
                         amount: totalAmount,
                         purchaser: email,
                         products: cart.products,
                    });

                    for (const product of cart.products) {
                         let productDB = await productModel.findById(
                              product.id_prod
                         );
                         productDB.stock -= product.quantity;
                         await productModel.findByIdAndUpdate(
                              product.id_prod,
                              productDB
                         );
                    }

                    await deleteCart(cartID);
                    return res.send({
                         status: 200,
                         message: "Ticket creado",
                         ticket: newTicket,
                    });
               } else {
                    console.warn(
                         "No hay stock suficiente para los siguientes productos: ",
                         prodNoStock
                    );
                    prodNoStock.forEach((productDB) => {
                         cart.products = cart.products.filter(
                              (product) =>
                                   product.id_prod.toString() !==
                                   productDB._id.toString()
                         );
                    });
                    await cartModel.findByIdAndUpdate(cartID, {
                         products: cart.products,
                    });
                    return res.send({
                         status: 404,
                         message:
                              "No hay stock suficiente para los siguientes productos: ",
                         prodNoStock,
                    });
               }
          } else {
               console.error("Carrito no encontrado");
               return res.send({
                    status: 404,
                    message: "Carrito no encontrado",
               });
          }
     } catch (error) {
          console.error("Error al crear ticket: ", error);
          return res.status(500).send({
               message: "Error interno del servidor al crear ticket",
          });
     }
};

export const deleteProductFromCart = async (req, res) => {
     try {
          const cartID = req.params.cid;
          const productID = req.params.pid;
          const cart = await cartModel.findById(cartID);
          const index = cart.products.findIndex(
               (product) => product.id_prod._id == productID
          );
          if (index != -1) {
               cart.products.splice(index, 1);
               await cartModel.findByIdAndUpdate(cartID, cart);
               res.send({
                    status: 200,
                    message: "Producto eliminado del carrito",
               });
          } else {
               res.send({
                    status: 404,
                    message: "Producto no encontrado en el carrito",
               });
          }
     } catch (error) {
          console.error(
               "Error interno del servidor al eliminar el producto: ",
               error
          );
          return res.send({
               status: 500,
               message: "Error interno del servidor al eliminar el producto",
          });
     }
};

export const deleteCart = async (cartID) => {
     try {
          const cart = await cartModel.findById(cartID);
          cart.products = [];
          await cartModel.findByIdAndUpdate(cartID, cart);
          console.log("Carrito vaciado correctamente");
     } catch (error) {
          console.error(
               "Error interno del servidor al eliminar el carrito: ",
               error
          );
          throw error; // Lanza el error para que el controlador llamante lo maneje
     }
};
