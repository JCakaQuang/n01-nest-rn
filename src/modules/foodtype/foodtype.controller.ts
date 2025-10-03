import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodtypeService } from './foodtype.service';
import { CreateFoodtypeDto } from './dto/create-foodtype.dto';
import { UpdateFoodtypeDto } from './dto/update-foodtype.dto';

@Controller('foodtype')
export class FoodtypeController {
  constructor(private readonly foodtypeService: FoodtypeService) {}

  @Post()
  create(@Body() createFoodtypeDto: CreateFoodtypeDto) {
    return this.foodtypeService.create(createFoodtypeDto);
  }

  @Get()
  findAll() {
    return this.foodtypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodtypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodtypeDto: UpdateFoodtypeDto) {
    return this.foodtypeService.update(+id, updateFoodtypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodtypeService.remove(+id);
  }
}
