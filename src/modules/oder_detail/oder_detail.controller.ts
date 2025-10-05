import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
    async findAll(
      @Query() query: any,
      @Query('current') current: string,
      @Query('pageSize') pageSize: string,
    ) {
      const currentPage = current ? parseInt(current, 10) : 1;
      const size = pageSize ? parseInt(pageSize, 10) : 10;
      return this.oderDetailService.findAll(query, currentPage, size);
    }

  @Patch()
  update(@Body() updateOderDetailDto: UpdateOrderDetailDto) {
    return this.oderDetailService.update(updateOderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oderDetailService.remove(id);
  }
}
