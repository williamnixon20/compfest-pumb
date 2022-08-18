import { ApiProperty } from "@nestjs/swagger";

export class Option {
    @ApiProperty()
    id: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    question_id?: string;
}
