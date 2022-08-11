import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto {
    @ApiProperty()
    statement: string;
    
    @ApiProperty()
    feedback: string;

    @ApiProperty()
    expected_answer: string;

    @ApiProperty({ type: [String] })
    answers: string[];
}
