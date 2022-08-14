import { ApiProperty } from "@nestjs/swagger";

export class OptionQuestion {
    @ApiProperty()
    question_id: number;

    @ApiProperty()
    option_id: number;
}