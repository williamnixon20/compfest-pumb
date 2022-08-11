import { ApiProperty } from "@nestjs/swagger";
import { Answer } from "src/answers/entities/answer.entity";

export class Question {
    @ApiProperty()
    id: number;

    @ApiProperty()
    statement: string;
    
    @ApiProperty()
    feedback: string;

    @ApiProperty()
    expected_answer: Answer;

    @ApiProperty({ type: [Answer] })
    answers: Answer[];

    constructor(id: number, statement: string, feedback: string, expected_answer: Answer, answers: Answer[]) {
        this.id = id;
        this.statement = statement;
        this.feedback = feedback;
        this.expected_answer = expected_answer;
        this.answers = answers;
    }
}
