import { userRole } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  phone!: string;

  @IsEnum(userRole)
  role: userRole;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
