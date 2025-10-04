import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFoodTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
