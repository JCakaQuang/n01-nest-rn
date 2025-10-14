import { IsMongoId, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateFoodDto {
  @IsOptional()
  @IsMongoId({ message: 'FoodType ID không hợp lệ.' })
  foodtype_id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
