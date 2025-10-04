import { IsBoolean, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsMongoId({ message: 'Invalid user ID' })
    @IsNotEmpty({ message: 'User ID is required' })
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
} 
