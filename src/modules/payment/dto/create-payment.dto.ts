import { IsString, IsNumber, IsMongoId, IsDate, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsMongoId()
  order_id: string;

  @IsString()
  @IsNotEmpty()
  method: string; // cash, momo, credit card

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDate()
  payment_date?: Date;

  @IsString()
  status: string; // success, failed, pending
}
