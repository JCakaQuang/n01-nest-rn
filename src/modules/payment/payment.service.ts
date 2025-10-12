import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
 constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {}
 
   async create(dto: CreatePaymentDto) {
     return await this.paymentModel.create(dto);
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

  async findAllByUser(userId: string) {
    // BƯỚC 1: Tìm tất cả các đơn hàng (Order) thuộc về user_id này
    // và chỉ lấy ra trường `_id` của chúng để tối ưu.
    // `this.paymentModel.db.model('Order')` cho phép truy cập model 'Order' từ service hiện tại.
    const userOrders = await this.paymentModel.db.model('Order').find({ user_id: userId }).select('_id').exec();

    // BƯỚC 2: Trích xuất các ID từ kết quả ở bước 1 thành một mảng.
    // Ví dụ: ['id_order_1', 'id_order_2', ...]
    const orderIds = userOrders.map(order => order._id);

    // BƯỚC 3: Tìm tất cả các bản ghi Payment có trường `order_id` 
    // nằm trong mảng `orderIds` đã lấy được.
    return await this.paymentModel
      .find({ order_id: { $in: orderIds } })
      .sort({ createdAt: -1 }) // Sắp xếp theo ngày tạo mới nhất
      .exec();
  }
 
   async update(dto: UpdatePaymentDto) {
     return await this.paymentModel.updateOne({ _id: dto._id }, { $set: dto });
   }
 
   async remove(id: string) {
     return await this.paymentModel.deleteOne({ _id: id });
   }
}
