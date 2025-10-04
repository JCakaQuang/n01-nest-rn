import { IsString, IsMongoId, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsMongoId()
  sender_id: string;

  @IsMongoId()
  receiver_id: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
