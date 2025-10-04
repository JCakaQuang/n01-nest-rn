import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-oder_detail.dto';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {}
