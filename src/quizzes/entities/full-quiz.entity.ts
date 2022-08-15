import { ApiProperty } from "@nestjs/swagger";
import { QuizQuestion } from "./quiz-question.entity";

export class FullQuiz extends QuizQuestion {
    @ApiProperty()
    attempt: boolean;
}