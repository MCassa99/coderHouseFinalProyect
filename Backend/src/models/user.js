import { Schema, model } from 'mongoose';
import { cartModel } from './cart.js';

const userSchema = new Schema({
     first_name: {
          type: String,
          required: true
     },
     last_name: {
          type: String,
          required: true
     },
     age: {
          type: Number,
          required: true
     },
     email: {
          type: String,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     role: {
          type: String,
          default: 'User'
     },
     cart_id: {
          type: Schema.Types.ObjectId,
          ref: 'Cart'
     },
     documents: {
          type: Object,
          default: []
     },
     last_connection: {
          type: Date
     }
});

//Create cart for user
/*
userSchema.pre('save', async function (next) {
     try {
          const newCart = await cartModel.create({ products: [] });
          this.cart_id = newCart._id;
     } catch (error) {
          next(error);
     }
});*/

//Create cart for user only if it is a new user
userSchema.pre("save", async function (next) {
     try {
          if (this.isNew) {
               const newCart = await cartModel.create({ products: [] });
               this.cart_id = newCart._id;
          }
          next();
     } catch (error) {
          next(error);
     }
});

export const userModel = model('User', userSchema);