import { IsNotEmpty, IsString } from 'class-validator';

export class LoginValidationDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
