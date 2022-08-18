import { ApiProperty } from "@nestjs/swagger";
import { Question } from "src/questions/entities/question.entity";

export class Quiz {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    course_id: string;

    @ApiProperty()
    attempt?: boolean;

    @ApiProperty()
    questions?: Question[];
}
