import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SaleItem } from './sale-item.entity';
import { User } from '../../users/entities/user.entity';
import { Market } from '../../markets/entities/market.entity';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Sale {
  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  customer: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Market.name })
  market: Market;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: SaleItem.name }],
  })
  items: SaleItem;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
