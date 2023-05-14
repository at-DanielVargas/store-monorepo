import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument, ObjectId } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  action: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
