import { ApiProperty } from "@nestjs/swagger";

export class Lecture {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    course_id: number;
}
