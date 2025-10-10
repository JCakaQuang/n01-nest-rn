import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OderController {
  constructor(private readonly oderService: OderService) {}

  @Post()
  create(@Body() createOderDto: CreateOrderDto) {
    return this.oderService.create(createOderDto);
  }

  @Patch(':id/confirm-payment')
  confirmPayment(@Param('id') id: string) {
    return this.oderService.confirmPaymentAndUpdateStock(id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oderService.findOne(id);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    const currentPage = current ? parseInt(current, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    return this.oderService.findAll(query, currentPage, size);
  }
  
  @Patch()
  update(@Body() updateOderDto: UpdateOrderDto) {
    return this.oderService.update(updateOderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oderService.remove(id);
  }
}