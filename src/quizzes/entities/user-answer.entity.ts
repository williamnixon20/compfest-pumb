import { ApiProperty } from "@nestjs/swagger";

export class UserAnswer {
    @ApiProperty()
    question_id: number;

    @ApiProperty()
    option_id: number;

    @ApiProperty()
    correct_id: number;

    @ApiProperty()
    feedback: string;
}
