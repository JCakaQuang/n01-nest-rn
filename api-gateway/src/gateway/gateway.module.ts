import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
