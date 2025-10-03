import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  account_type: string; // ví dụ: local, google, facebook

  @Prop()
  role: string; // admin, customer, shipper,...

  @Prop({ default: true })
  is_active: boolean;

  @Prop()
  code_id: string;

  @Prop()
  code_expired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
