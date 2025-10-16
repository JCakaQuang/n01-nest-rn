import { IsEmail, IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsMongoId({ message: 'Invalid user ID' })
    @IsOptional()
    _id: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsOptional()
    @IsIn(['admin', 'user'])
    role?: string;
}