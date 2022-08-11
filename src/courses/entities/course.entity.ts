import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/entities/category.entity";

export class Course {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string;

    @ApiProperty({ type: [Category] })
    categories: Category[];
}
