import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../../roles/entities/role.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Role.name }],
  })
  roles: Role[];
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('fullName').get(function (this: User) {
  return `${this.firstname} ${this.lastname}`;
});

export { UserSchema };
