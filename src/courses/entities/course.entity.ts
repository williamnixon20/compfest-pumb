import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class Course {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: [Category] })
  categories: Category[];
}
