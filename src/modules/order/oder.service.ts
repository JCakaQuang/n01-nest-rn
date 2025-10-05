import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/oder.schema';
import { CreateOrderDto } from './dto/create-oder.dto';
import { UpdateOrderDto } from './dto/update-oder.dto';

@Injectable()
export class OderService {
  constructor(@InjectModel(Order.name) private foodModel: Model<Order>) { }

  async create(dto: CreateOrderDto) {
    return await this.foodModel.create(dto);
  }

  async findAll(query: any, current = 1, pageSize = 10) {
    const { current: _, pageSize: __, ...queryWithoutPagination } = query;
    const aqp = (await import('api-query-params')).default;
    const { filter, sort } = aqp(queryWithoutPagination);
    const skip = (current - 1) * pageSize;

    const data = await this.foodModel.find(filter).skip(skip).limit(pageSize).sort(sort as any);
    const total = await this.foodModel.countDocuments(filter);

    return { data, meta: { current, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
  }

  async update(dto: UpdateOrderDto) {
    return await this.foodModel.updateOne({ _id: dto._id }, { $set: dto });
  }

  async remove(id: string) {
    return await this.foodModel.deleteOne({ _id: id });
  }
}
