import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDetailDto {
    @IsMongoId()
    _id: string;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsNumber()
    @IsOptional()
    price: number;
}
