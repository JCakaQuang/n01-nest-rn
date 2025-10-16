import { IsMongoId, IsOptional, IsString } from "class-validator";

export class UpdateFoodTypeDto {
    @IsOptional()
    @IsMongoId()
    _id: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}
