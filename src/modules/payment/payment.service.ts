import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
 constructor(@InjectModel(Payment.name) private foodModel: Model<Payment>) {}
 
   async create(dto: CreatePaymentDto) {
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
 
   async update(dto: UpdatePaymentDto) {
     return await this.foodModel.updateOne({ _id: dto._id }, { $set: dto });
   }
 
   async remove(id: string) {
     return await this.foodModel.deleteOne({ _id: id });
   }
}
