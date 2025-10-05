import { Module } from '@nestjs/common';
import { FoodsService } from './food.service';
import { FoodsController } from './food.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './schemas/food.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }])],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodModule {}
