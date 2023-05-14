import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Permission } from '../../permissions/entities/permission.entity';
import { Transform } from 'class-transformer';

export type RoleDocument = HydratedDocument<Role>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Role {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Permission.name }],
  })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
