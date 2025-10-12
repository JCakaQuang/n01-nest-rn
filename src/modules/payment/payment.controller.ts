import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    const currentPage = current ? parseInt(current, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    return this.paymentService.findAll(query, currentPage, size);
  }

  @Patch()
  update( @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(updatePaymentDto);
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.paymentService.findAllByUser(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
