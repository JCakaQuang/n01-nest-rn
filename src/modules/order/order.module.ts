import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderDetail, OrderDetailSchema } from '../order_detail/schemas/oder_detail.schema';
import { Food, FoodSchema } from '../food/schemas/food.schema';
import { Payment, PaymentSchema } from '../payment/schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      
      // --- THÊM 2 DÒNG SAU ĐỂ INJECT MODEL VÀO SERVICE ---
      { name: OrderDetail.name, schema: OrderDetailSchema },
      { name: Food.name, schema: FoodSchema },
      { name: Payment.name, schema: PaymentSchema }
    ]),
  ],
  controllers: [OderController],
  providers: [OrderService],
})
export class OrderModule {}