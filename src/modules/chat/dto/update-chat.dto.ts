import { IsMongoId, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateChatDto {
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
