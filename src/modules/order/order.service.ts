import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { getConnectionToken, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Food } from '../food/schemas/food.schema';
import { OrderDetail } from '../order_detail/schemas/oder_detail.schema';
import { Payment } from '../payment/schemas/payment.schema';
@Injectable()
export class OderService {
  // --- CẬP NHẬT CONSTRUCTOR ĐỂ NHẬN CÁC MODEL KHÁC ---
constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderDetail.name) private orderDetailModel: Model<OrderDetail>,
    @InjectModel(Food.name) private foodModel: Model<Food>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>, // <-- INJECT PAYMENT MODEL
    @Inject(getConnectionToken()) private readonly connection: mongoose.Connection,
  ) {}

  async create(dto: CreateOrderDto) {
    return await this.orderModel.create(dto);
  }

  async confirmPaymentAndUpdateStock(id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // BƯỚC 1: Cập nhật trạng thái Order (không đổi)
      const order = await this.orderModel.findByIdAndUpdate(id, { status: 'paid' }, { new: true, session });
      if (!order) throw new Error('Không tìm thấy đơn hàng.');

      // BƯỚC 2: Tìm Order Details (không đổi)
      const details = await this.orderDetailModel.find({ order_id: id }).session(session);
      if (!details.length) throw new Error('Không tìm thấy chi tiết của đơn hàng.');

      // BƯỚC 3: Trừ kho (không đổi)
      for (const detail of details) {
        await this.foodModel.updateOne({ _id: detail.food_id }, { $inc: { quantity: -detail.quantity } }, { session });
      }

      // BƯỚC 4: TẠO BẢN GHI PAYMENT MỚI
      await this.paymentModel.create([{ // Mongoose `create` trong session cần một array
        order_id: order._id,
        amount: order.total_price,
        method: 'cash_on_delivery', // Sẽ cải tiến ở bước sau
        status: 'success',
        payment_date: new Date()
      }], { session }); // Quan trọng: đưa vào transaction

      // Commit transaction
      await session.commitTransaction();
      return {
        statusCode: 200,
        message: 'Xác nhận thanh toán, cập nhật kho và tạo payment thành công!',
        order,
      };
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      session.endSession();
    }
  }

  async findAll(query: any, current = 1, pageSize = 10) {
    const { current: _, pageSize: __, ...queryWithoutPagination } = query;
    const aqp = (await import('api-query-params')).default;
    const { filter, sort } = aqp(queryWithoutPagination);
    const skip = (current - 1) * pageSize;

    const data = await this.orderModel.find(filter).skip(skip).limit(pageSize).sort(sort as any);
    const total = await this.orderModel.countDocuments(filter);

    return { data, meta: { current, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
  }

  async update(dto: UpdateOrderDto) {
    return await this.orderModel.updateOne({ _id: dto._id }, { $set: dto });
  }

  async findOne(id: string) {
    // Thêm .populate('user_id') nếu bạn muốn lấy thông tin user

    return await this.orderModel.findById(id).exec();
  }

  async remove(id: string) {
    return await this.orderModel.deleteOne({ _id: id });
  }
}