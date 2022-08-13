import { ApiProperty } from "@nestjs/swagger";

export class Question {
    @ApiProperty()
    id: number;

    @ApiProperty()
    statement: string;

    @ApiProperty()
    quiz_id: number;
}
