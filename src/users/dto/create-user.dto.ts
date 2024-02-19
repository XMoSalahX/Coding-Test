import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';
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
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserTypeEnum)
  @IsOptional()
  @IsNotEmpty()
  userType: UserTypeEnum;
}
