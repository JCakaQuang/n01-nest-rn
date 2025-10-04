import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-oder_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-oder_detail.dto';

@Injectable()
export class OrderDetailService {
  create(createOderDetailDto: CreateOrderDetailDto) {
    return 'This action adds a new oderDetail';
  }

  findAll() {
    return `This action returns all oderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oderDetail`;
  }

  update(id: number, updateOderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} oderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} oderDetail`;
  }
}
