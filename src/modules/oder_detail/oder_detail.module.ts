import { Module } from '@nestjs/common';
import { OrderDetailService } from './oder_detail.service';
import { OderDetailController } from './oder_detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetail, OrderDetailSchema } from './schemas/oder_detail.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderDetail.name, schema: OrderDetailSchema }])],
  controllers: [OderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
