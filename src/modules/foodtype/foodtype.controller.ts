import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FoodtypeService } from './foodtype.service';
import { CreateFoodTypeDto } from './dto/create-foodtype.dto';
import { UpdateFoodTypeDto } from './dto/update-foodtype.dto';

@Controller('foodtype')
export class FoodtypeController {
  constructor(private readonly foodsService: FoodtypeService) {}
  
    @Post()
    create(@Body() dto: CreateFoodTypeDto) {
      return this.foodsService.create(dto);
    }
  
    @Get()
    async findAll(
      @Query() query: any,
      @Query('current') current: string,
      @Query('pageSize') pageSize: string,
    ) {
      const currentPage = current ? parseInt(current, 10) : 1;
      const size = pageSize ? parseInt(pageSize, 10) : 10;
      return this.foodsService.findAll(query, currentPage, size);
    }
  
    @Patch()
    update(@Body() dto: UpdateFoodTypeDto) {
      return this.foodsService.update(dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.foodsService.remove(id);
    }
}
