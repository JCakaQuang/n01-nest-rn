import { IsString, IsNumber, IsMongoId, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  quantity: number;

  @IsMongoId()
  foodtype_id: string;
}
