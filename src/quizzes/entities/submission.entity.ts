import { ApiProperty } from "@nestjs/swagger";
import { UserAnswer } from "./user-answer.entity";

export class Submission {
    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    quiz_id: number;

    @ApiProperty()
    score: number;

    @ApiProperty({ type: [UserAnswer] })
    answers: UserAnswer[];
}
