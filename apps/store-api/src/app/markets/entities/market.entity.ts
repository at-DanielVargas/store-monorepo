import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Address } from '../../address/entities/address.entity';

@Schema()
export class Market {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Address.name })
  address: Address;
}

export const MarketSchema = SchemaFactory.createForClass(Market);
