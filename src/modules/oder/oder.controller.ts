import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OderService } from './oder.service';
import { CreateOrderDto } from './dto/create-oder.dto';
import { UpdateOrderDto } from './dto/update-oder.dto';

@Controller('oder')
export class OderController {
  constructor(private readonly oderService: OderService) {}

  @Post()
  create(@Body() createOderDto: CreateOrderDto) {
    return this.oderService.create(createOderDto);
  }

  @Get()
  findAll() {
    return this.oderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOderDto: UpdateOrderDto) {
    return this.oderService.update(+id, updateOderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oderService.remove(+id);
  }
}
