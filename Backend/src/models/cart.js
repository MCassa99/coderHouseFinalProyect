import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
     products: {
          type:[ {
               id_prod: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'products'
               },
               quantity: {
                    type: Number,
                    required: true
               }
          }],
          default: []
     }   
});

cartSchema.pre('findOne', function() {
     this.populate('products.id_prod');
});

export const cartModel = model('Cart', cartSchema);;