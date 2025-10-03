import { Injectable } from '@nestjs/common';
import { CreateFoodtypeDto } from './dto/create-foodtype.dto';
import { UpdateFoodtypeDto } from './dto/update-foodtype.dto';

@Injectable()
export class FoodtypeService {
  create(createFoodtypeDto: CreateFoodtypeDto) {
    return 'This action adds a new foodtype';
  }

  findAll() {
    return `This action returns all foodtype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodtype`;
  }

  update(id: number, updateFoodtypeDto: UpdateFoodtypeDto) {
    return `This action updates a #${id} foodtype`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodtype`;
  }
}
