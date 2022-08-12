import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateCourseStatusDto {
  @IsNotEmpty()
  @ApiProperty({ enum: ['VERIFYING', 'VERIFIED', 'REJECTED'] })
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  description: string;
}

export class UpdateTeacherStatusDto {
  @IsNotEmpty()
  @ApiProperty({ enum: ['VERIFYING', 'VERIFIED', 'REJECTED'] })
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  description: string;
}
