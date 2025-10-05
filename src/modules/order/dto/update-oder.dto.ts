import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
    @IsMongoId()
    _id: string;

    @IsString()
    @IsOptional()
    status: string; // pending, paid, shipped,...

    @IsNumber()
    @IsOptional()
    total_price: number;
}
