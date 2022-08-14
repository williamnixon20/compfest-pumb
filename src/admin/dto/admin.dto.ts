import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateStatusObject {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  @ApiProperty({ enum: ['VERIFYING', 'VERIFIED', 'REJECTED'] })
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  description: string;
}
export class UpdateStatusDto {
  @IsNotEmpty()
  @ApiProperty({ type: [UpdateStatusObject] })
  updateArray: UpdateStatusObject[];
}
