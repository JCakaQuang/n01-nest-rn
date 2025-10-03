import { Module } from '@nestjs/common';
import { OderDetailService } from './oder_detail.service';
import { OderDetailController } from './oder_detail.controller';

@Module({
  controllers: [OderDetailController],
  providers: [OderDetailService],
})
export class OderDetailModule {}
