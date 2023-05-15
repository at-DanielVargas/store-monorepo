import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from '../../products/entities/product.entity';

@Schema({
  toJSON: {
    getters: true,
  },
})
export class SaleItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  product: Product;

  @Prop()
  quantity: number;
}

export const SaleItemSchema = SchemaFactory.createForClass(SaleItem);
