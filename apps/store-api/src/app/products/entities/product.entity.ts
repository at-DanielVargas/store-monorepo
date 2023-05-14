import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from '../../categories/entities/category.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  supplierPrice: number;

  @Prop()
  stock: number;

  @Prop()
  purchases: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
