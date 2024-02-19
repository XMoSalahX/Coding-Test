import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiHideProperty()
  @IsOptional()
  authorId?: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
