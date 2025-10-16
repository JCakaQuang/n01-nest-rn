import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderDetail, OrderDetailSchema } from '../order_detail/schemas/oder_detail.schema';
import { HttpModule } from '@nestjs/axios';
import { Payment, PaymentSchema } from '../payment/schemas/payment.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderDetail.name, schema: OrderDetailSchema },
      { name: Payment.name, schema: PaymentSchema }
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}