import { ApiProperty } from "@nestjs/swagger";
import { FullQuestion } from "src/questions/entities/full-question.entity";

export class Quiz {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    course_id: number;

    @ApiProperty()
    attempt?: boolean;

    @ApiProperty()
    questions?: FullQuestion[];
}
