import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-oder.dto';
import { UpdateOrderDto } from './dto/update-oder.dto';

@Injectable()
export class OderService {
  create(createOderDto: CreateOrderDto) {
    return 'This action adds a new oder';
  }

  findAll() {
    return `This action returns all oder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oder`;
  }

  update(id: number, updateOderDto: UpdateOrderDto) {
    return `This action updates a #${id} oder`;
  }

  remove(id: number) {
    return `This action removes a #${id} oder`;
  }
}
