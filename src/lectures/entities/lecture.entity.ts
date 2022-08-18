import { ApiProperty } from "@nestjs/swagger";

export class Lecture {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    course_id: string;
}
