import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { Model } from 'mongoose';
import { Order } from '../order/schemas/order.schema';

@Injectable()
export class PaymentService {
 constructor(
  @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  @InjectModel(Order.name) private orderModel: Model<Order>
) {}
 
   async create(dto: CreatePaymentDto) {
     return await this.paymentModel.create(dto);
   }

  async findAllByUser(userId: string): Promise<Payment[]> {

    const userOrders = await this.orderModel.find({ user_id: userId }).select('_id').exec();

    const orderIds = userOrders.map(order => order._id);
    
    if (orderIds.length === 0) {
        return [];
    }
    return await this.paymentModel
      .find({ order_id: { $in: orderIds } })
      .sort({ createdAt: -1 })
      .exec();
  }
 
   async findAll(query: any, current = 1, pageSize = 10) {
     const { current: _, pageSize: __, ...queryWithoutPagination } = query;
     const aqp = (await import('api-query-params')).default;
     const { filter, sort } = aqp(queryWithoutPagination);
     const skip = (current - 1) * pageSize;
 
     const data = await this.paymentModel.find(filter).skip(skip).limit(pageSize).sort(sort as any);
     const total = await this.paymentModel.countDocuments(filter);
 
     return { data, meta: { current, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
   }
 
   async update(dto: UpdatePaymentDto) {
     return await this.paymentModel.updateOne({ _id: dto._id }, { $set: dto });
   }
 
   async remove(id: string) {
     return await this.paymentModel.deleteOne({ _id: id });
   }
}
