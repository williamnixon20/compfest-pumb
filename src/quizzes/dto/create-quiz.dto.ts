import { ApiProperty } from "@nestjs/swagger";
import { Question } from "src/questions/entities/question.entity";

export class CreateQuizDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ type: [Question] })
    questions: Question[];
}
