import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodModule } from './modules/food/food.module';
import { FoodtypeModule } from './modules/foodtype/foodtype.module';
import { OrderModule } from './modules/order/order.module';
import { OrderDetailModule } from './modules/order_detail/order_detail.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ChatModule } from './modules/chat/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    FoodModule,
    FoodtypeModule,
    OrderModule,
    OrderDetailModule,
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
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
