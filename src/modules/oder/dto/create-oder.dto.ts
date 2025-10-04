import { IsString, IsNumber, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsMongoId()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  status: string; // pending, paid, shipped,...

  @IsNumber()
  total_price: number;
}
