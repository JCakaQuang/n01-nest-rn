import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsMongoId()
  _id: string;

  @IsString()
  @IsOptional()
  method: string; // cash, momo, credit card

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsOptional()
  @IsDate()
  payment_date?: Date;

  @IsString()
  @IsOptional()
  status: string; // success, failed, pending
}
