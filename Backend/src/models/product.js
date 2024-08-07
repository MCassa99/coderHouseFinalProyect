import { raw } from 'express';
import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
     title: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     price: {
          type: Number,
          required: true
     },
     thumbnail: {
          default:[]
     },
     category: {
          type: String,
          required: true
     },
     status: {
          type: Boolean,
          default: true
     },
     code: {
          type: String,
          required: true,
          unique: true
     },
     stay_time: {
          type: Number
          //required: true
     },
     rating: {
          type: Number
     },
     stock: {
          type: Number
          //required: true
     },
     transshipment: {
          type: Number
          //required: true
     },
     image: {
          type: String,
     }
});

productSchema.plugin(paginate);

export const productModel = model('products', productSchema);