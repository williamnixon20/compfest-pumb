import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ResourceType)
  @ApiProperty({ enum: ResourceType })
  type: ResourceType;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  file?: string;

  @IsNotEmpty()
  lecture_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  url?: string;
}
