import { ApiProperty } from "@nestjs/swagger";
import { FullQuestion } from "src/questions/entities/full-question.entity";
import { Quiz } from "./quiz.entity";

export class QuizQuestion extends Quiz {
    @ApiProperty()
    questions: FullQuestion[];
}