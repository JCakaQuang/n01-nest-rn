import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodModule } from './modules/food/food.module';
import { FoodtypeModule } from './modules/foodtype/foodtype.module';
import { OderModule } from './modules/oder/oder.module';
import { OderDetailModule } from './modules/oder_detail/oder_detail.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    UsersModule,
    FoodModule,
    FoodtypeModule,
    OderModule,
    OderDetailModule,
    PaymentModule,
    ChatModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
