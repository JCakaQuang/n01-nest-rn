import { IsNumber, IsMongoId } from 'class-validator';

export class CreateOrderDetailDto {
  @IsMongoId()
  order_id: string;

  @IsMongoId()
  food_id: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
