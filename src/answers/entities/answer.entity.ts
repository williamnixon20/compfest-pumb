import { ApiProperty } from "@nestjs/swagger";

export class Answer {
    @ApiProperty()
    id: number;

    @ApiProperty()
    content: string;

    constructor(id: number, content: string) {
        this.id = id;
        this.content = content;
    }
}
