import { ApiProperty } from "@nestjs/swagger";
import { UserAnswer } from "./user-answer.entity";

export class Submission {
    @ApiProperty()
    id: string;

    @ApiProperty()
    user_id: string;

    @ApiProperty()
    quiz_id: string;

    @ApiProperty()
    score: number;

    @ApiProperty({ type: [UserAnswer] })
    answers?: UserAnswer[];
}
