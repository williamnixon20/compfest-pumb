import { ApiProperty } from "@nestjs/swagger";

export class UserAnswer {
    @ApiProperty()
    question_id: string;

    @ApiProperty()
    option_id: string;

    @ApiProperty()
    correct_id: string;

    @ApiProperty()
    feedback: string;
}
