import { Injectable } from '@nestjs/common';
import { CreateFoodTypeDto } from './dto/create-foodtype.dto';
import { UpdateFoodTypeDto } from './dto/update-foodtype.dto';

@Injectable()
export class FoodtypeService {
  create(createFoodtypeDto: CreateFoodTypeDto) {
    return 'This action adds a new foodtype';
  }

  findAll() {
    return `This action returns all foodtype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodtype`;
  }

  update(id: number, updateFoodtypeDto: UpdateFoodTypeDto) {
    return `This action updates a #${id} foodtype`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodtype`;
  }
}
