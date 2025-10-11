import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOderDto: CreateOrderDto) {
    return this.orderService.create(createOderDto);
  }

  @Patch(':id/confirm-payment')
  confirmPayment(@Param('id') id: string) {
    return this.orderService.confirmPaymentAndUpdateStock(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    const currentPage = current ? parseInt(current, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    return this.orderService.findAll(query, currentPage, size);
  }

  @Get('history/by-user/:userId')
  getOrderHistory(@Param('userId') userId: string) {
    return this.orderService.findAllByUser(userId);
  }

  @Patch()
  update(@Body() updateOderDto: UpdateOrderDto) {
    return this.orderService.update(updateOderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}