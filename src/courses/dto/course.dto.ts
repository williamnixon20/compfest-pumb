import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class category {
  name: string;
}
export class CreateCourseDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: [category] })
  categories: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}

export class ParamsDto {
  @IsOptional()
  courseName?: string;
  @IsOptional()
  categoryId?: string;
}

export class idParamsDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
