import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { getConnectionToken, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { OrderDetail } from '../order_detail/schemas/oder_detail.schema';
import { Payment } from '../payment/schemas/payment.schema';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  private readonly foodServiceUrl = 'http://food-service:8082/api/v1';

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderDetail.name) private orderDetailModel: Model<OrderDetail>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @Inject(getConnectionToken()) private readonly connection: mongoose.Connection,
    private readonly httpService: HttpService, // <-- Inject HttpService
  ) { }

  async create(dto: CreateOrderDto) {
    return await this.orderModel.create(dto);
  }

  async confirmPaymentAndUpdateStock(id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const order = await this.orderModel.findByIdAndUpdate(id, { status: 'paid' }, { new: true, session });
      if (!order) throw new BadRequestException('Không tìm thấy đơn hàng.');

      const details = await this.orderDetailModel.find({ order_id: id }).session(session);
      if (!details.length) throw new BadRequestException('Không tìm thấy chi tiết của đơn hàng.');

      for (const detail of details) {
        const foodResponse = await firstValueFrom(
          this.httpService.get(`${this.foodServiceUrl}/foods/${detail.food_id}`)
        );
        const foodInStock = foodResponse.data;

        if (!foodInStock) {
          throw new BadRequestException(`Sản phẩm với ID ${detail.food_id} không tồn tại.`);
        }
        if (foodInStock.quantity < detail.quantity) {
          throw new BadRequestException(`Món "${foodInStock.name}" không đủ số lượng trong kho.`);
        }

        await firstValueFrom(
          this.httpService.patch(`${this.foodServiceUrl}/foods/update-stock`, {
            foodId: detail.food_id,
            quantity: detail.quantity,
          })
        );
      }

      // Tạo bản ghi Payment cũng phải trong session
      await this.paymentModel.create([{
        order_id: order._id,
        amount: order.total_price,
        method: 'cash_on_delivery',
        status: 'success',
        payment_date: new Date()
      }], { session });

      await session.commitTransaction();

      return {
        statusCode: 200,
        message: 'Xác nhận thanh toán và cập nhật kho thành công!',
        order,
      };

    } catch (error) {
      await session.abortTransaction();
      throw error; 
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

  async findAllByUser(userId: string) {
    // Sắp xếp theo ngày tạo mới nhất
    return await this.orderModel.find({ user_id: userId }).sort({ createdAt: -1 }).exec();
  }

  async remove(id: string) {
    return await this.orderModel.deleteOne({ _id: id });
  }
}