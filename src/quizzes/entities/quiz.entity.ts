import { ApiProperty } from "@nestjs/swagger";

export class Quiz {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    course_id: number;
}
