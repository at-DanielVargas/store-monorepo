import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Sale {
  @Prop({ type: Date, default: Date.now })
  date: Date;

//   @Prop({type})
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
