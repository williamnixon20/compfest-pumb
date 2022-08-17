import { ApiProperty } from "@nestjs/swagger";
import { Question } from "src/questions/entities/question.entity";

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
    questions?: Question[];
}
