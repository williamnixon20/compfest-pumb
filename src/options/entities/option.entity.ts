import { ApiProperty } from "@nestjs/swagger";

export class Option{
    @ApiProperty()
    id: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    question_id: number;
}
