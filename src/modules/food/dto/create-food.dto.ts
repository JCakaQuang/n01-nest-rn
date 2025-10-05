import { IsString, IsNumber, IsMongoId, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  quantity: number;

  @IsOptional()
  foodtype_id: string;
}
