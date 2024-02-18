import { IsString, IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { UserTypeEnum } from '../enums/usertype';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
