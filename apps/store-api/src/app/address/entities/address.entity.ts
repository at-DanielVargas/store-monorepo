import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  @Prop()
  alias: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: number;

  @Prop()
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
