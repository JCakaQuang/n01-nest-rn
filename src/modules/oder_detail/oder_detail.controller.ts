import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './oder_detail.service';
import { CreateOrderDetailDto } from './dto/create-oder_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-oder_detail.dto';

@Controller('oder-detail')
export class OderDetailController {
  constructor(private readonly oderDetailService: OrderDetailService) {}

  @Post()
  create(@Body() createOderDetailDto: CreateOrderDetailDto) {
    return this.oderDetailService.create(createOderDetailDto);
  }

  @Get()
  findAll() {
    return this.oderDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oderDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOderDetailDto: UpdateOrderDetailDto) {
    return this.oderDetailService.update(+id, updateOderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oderDetailService.remove(+id);
  }
}
