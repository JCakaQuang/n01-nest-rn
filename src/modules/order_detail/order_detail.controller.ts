import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';

@Controller('oder-detail')
export class OrderDetailController {
  constructor(private readonly OrderDetailService: OrderDetailService) {}

  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.OrderDetailService.create(createOrderDetailDto);
  }

  @Get()
    async findAll(
      @Query() query: any,
      @Query('current') current: string,
      @Query('pageSize') pageSize: string,
    ) {
      const currentPage = current ? parseInt(current, 10) : 1;
      const size = pageSize ? parseInt(pageSize, 10) : 10;
      return this.OrderDetailService.findAll(query, currentPage, size);
    }

  @Patch()
  update(@Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.OrderDetailService.update(updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.OrderDetailService.remove(id);
  }
}
