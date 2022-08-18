import { ApiProperty } from "@nestjs/swagger";

export class Answer {
    @ApiProperty()
    question_id: string;

    @ApiProperty()
    correct_id: string;

    @ApiProperty()
    feedback: string;
}
