import { ApiProperty } from "@nestjs/swagger";
import { Quiz } from "./quiz.entity";

export class QuizAttempt extends Quiz {
    @ApiProperty()
    attempt: boolean;
}