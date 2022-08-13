import { IsNotEmpty, IsOptional } from 'class-validator';
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
  thumbnail_url: string;

  @IsNotEmpty()
  @ApiProperty({ type: [category] })
  categories: category[];
}

export class ParamsDto {
  @IsOptional()
  courseName?: string;
  @IsOptional()
  categoryId?: number;
}
