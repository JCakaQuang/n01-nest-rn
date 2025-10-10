import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop()
  status: string; // pending, paid, shipped, completed...

  @Prop()
  total_price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
