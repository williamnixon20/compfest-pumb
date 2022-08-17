import { ApiProperty } from "@nestjs/swagger";

export class Answer {
    @ApiProperty()
    question_id: number;

    @ApiProperty()
    correct_id: number;

    @ApiProperty()
    feedback: string;
}
