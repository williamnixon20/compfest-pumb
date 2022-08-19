import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusObject {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @ApiProperty({ enum: ['VERIFYING', 'VERIFIED', 'REJECTED'] })
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsString()
  description: string;
}
export class UpdateStatusDto {
  @IsNotEmpty()
  @ApiProperty({ type: [UpdateStatusObject] })
  updateArray: UpdateStatusObject[];
}
