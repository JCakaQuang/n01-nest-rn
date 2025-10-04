import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender_id: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  receiver_id: string;

  @Prop()
  message: string;

  @Prop({ default: false })
  is_read: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
