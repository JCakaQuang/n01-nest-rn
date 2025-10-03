import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order_id: string;

  @Prop({ type: Types.ObjectId, ref: 'Food' })
  food_id: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
