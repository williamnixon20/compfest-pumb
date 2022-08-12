import { IsNotEmpty } from 'class-validator';
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
