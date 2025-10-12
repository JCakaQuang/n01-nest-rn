import { Injectable } from '@nestjs/common';
import { CreateFoodTypeDto } from './dto/create-foodtype.dto';
import { UpdateFoodTypeDto } from './dto/update-foodtype.dto';
import { FoodType } from './schemas/foodtype.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FoodtypeService {
  constructor(@InjectModel(FoodType.name) private FoodTypeModel: Model<FoodType>) { }

  async create(dto: CreateFoodTypeDto) {
    return await this.FoodTypeModel.create(dto);
  }

  async findAll(query: any, current = 1, pageSize = 10) {
    const { current: _, pageSize: __, ...queryWithoutPagination } = query;
    const aqp = (await import('api-query-params')).default;
    const { filter, sort } = aqp(queryWithoutPagination);
    const skip = (current - 1) * pageSize;

    const data = await this.FoodTypeModel.find(filter).skip(skip).limit(pageSize).sort(sort as any);
    const total = await this.FoodTypeModel.countDocuments(filter);

    return { data, meta: { current, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
  }

  async findOne(id: string) {
    return await this.FoodTypeModel.findById(id).exec();
  }

  async update(dto: UpdateFoodTypeDto) {
    return await this.FoodTypeModel.updateOne({ _id: dto._id }, { $set: dto });
  }

  async remove(id: string) {
    return await this.FoodTypeModel.deleteOne({ _id: id });
  }
}
