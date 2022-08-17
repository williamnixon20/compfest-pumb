import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ResourceType)
  @ApiProperty({ enum: ResourceType })
  type: ResourceType;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;

  @IsNotEmpty()
  lecture_id: number;
}
