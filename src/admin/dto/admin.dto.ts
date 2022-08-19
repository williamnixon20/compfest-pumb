import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateStatusObject {
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
