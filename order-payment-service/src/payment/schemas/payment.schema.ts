import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order_id: string;

  @Prop()
  method: string; // cash, momo, credit card

  @Prop()
  amount: number;

  @Prop()
  payment_date: Date;

  @Prop()
  status: string; // success, failed, pending
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
