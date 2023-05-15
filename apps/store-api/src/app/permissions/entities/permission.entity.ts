import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ versionKey: false })
export class Permission {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  action: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
