import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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
  @IsUUID()
  lecture_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  url?: string;
}
