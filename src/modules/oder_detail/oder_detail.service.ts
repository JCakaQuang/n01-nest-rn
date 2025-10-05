import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-oder_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-oder_detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDetail } from './schemas/oder_detail.schema';

@Injectable()
export class OrderDetailService {
  constructor(@InjectModel(OrderDetail.name) private orderDetailModel: Model<OrderDetail>) {}
  
    async create(dto: CreateOrderDetailDto) {
      return await this.orderDetailModel.create(dto);
    }
  
    async findAll(query: any, current = 1, pageSize = 10) {
      const { current: _, pageSize: __, ...queryWithoutPagination } = query;
      const aqp = (await import('api-query-params')).default;
      const { filter, sort } = aqp(queryWithoutPagination);
      const skip = (current - 1) * pageSize;
  
      const data = await this.orderDetailModel.find(filter).skip(skip).limit(pageSize).sort(sort as any);
      const total = await this.orderDetailModel.countDocuments(filter);
  
      return { data, meta: { current, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
    }
  
    async update(dto: UpdateOrderDetailDto) {
      return await this.orderDetailModel.updateOne({ _id: dto._id }, { $set: dto });
    }
  
    async remove(id: string) {
      return await this.orderDetailModel.deleteOne({ _id: id });
    }
}
