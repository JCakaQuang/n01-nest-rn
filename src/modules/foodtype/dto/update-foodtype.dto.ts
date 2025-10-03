import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodtypeDto } from './create-foodtype.dto';

export class UpdateFoodtypeDto extends PartialType(CreateFoodtypeDto) {}
