import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string;

    @ApiProperty({ type: [String] })
    categories: string[];
}
