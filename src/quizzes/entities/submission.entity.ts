import { ApiProperty } from "@nestjs/swagger";
import { OptionQuestion } from "./option-question.entity";

export class Submission {
    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    quiz_id: number;

    @ApiProperty()
    score: number;

    @ApiProperty()
    answers: OptionQuestion[];
}
