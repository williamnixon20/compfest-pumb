import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @ApiProperty({ enum: ['STUDENT', 'TEACHER'] })
  @IsEnum(UserRole)
  role: UserRole;
}

export class LoginUserDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
