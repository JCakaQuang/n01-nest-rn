import { PartialType } from '@nestjs/mapped-types';
import { CreateOderDetailDto } from './create-oder_detail.dto';

export class UpdateOderDetailDto extends PartialType(CreateOderDetailDto) {}
