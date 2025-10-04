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

  @Prop({ default: 'LOCAL' })
  account_type: string; // ví dụ: local, google, facebook

  @Prop({ default: 'USERS' })
  role: string; // admin, user,...

  @Prop({ default: false })
  is_active: boolean;

  @Prop()
  code_id: string;

  @Prop()
  code_expired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
