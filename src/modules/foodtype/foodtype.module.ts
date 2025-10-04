import { Module } from '@nestjs/common';
import { FoodtypeService } from './foodtype.service';
import { FoodtypeController } from './foodtype.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodType, FoodTypeSchema } from './schemas/foodtype.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: FoodType.name, schema: FoodTypeSchema }])],
  controllers: [FoodtypeController],
  providers: [FoodtypeService],
})
export class FoodtypeModule {}
