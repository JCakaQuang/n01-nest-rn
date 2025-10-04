import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodTypeDto } from './create-foodtype.dto';

export class UpdateFoodTypeDto extends PartialType(CreateFoodTypeDto) {}
