import { Module } from '@nestjs/common';
import { FoodtypeService } from './foodtype.service';
import { FoodtypeController } from './foodtype.controller';

@Module({
  controllers: [FoodtypeController],
  providers: [FoodtypeService],
})
export class FoodtypeModule {}
