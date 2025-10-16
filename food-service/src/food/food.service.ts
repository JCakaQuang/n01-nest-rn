import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './schemas/food.schema';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async create(dto: CreateFoodDto) {
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

  async update(id: string, dto: UpdateFoodDto) {
    return await this.foodModel.updateOne({ _id: id }, { $set: dto });
  }

  async findOne(id: string) {
    return await this.foodModel.findById(id).exec();
  }

  async remove(id: string) {
    return await this.foodModel.deleteOne({ _id: id });
  }

  async decreaseStock(foodId: string, quantityToDecrease: number) {
    const food = await this.findOne(foodId);

    if (!food) {
      throw new BadRequestException(`Không tìm thấy món với id "${foodId}".`);
    }

    if (food.quantity < quantityToDecrease) {
      throw new BadRequestException(`Món "${food.name}" không đủ số lượng trong kho.`);
    }

    const result = await this.foodModel.updateOne(
      { _id: foodId },
      { $inc: { quantity: -quantityToDecrease } }
    );

    return {
      message: `Cập nhật kho cho món "${food.name}" thành công.`,
      result,
    };
  }
}
