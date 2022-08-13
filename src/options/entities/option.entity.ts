import { ApiProperty } from "@nestjs/swagger";

export class Option {
    @ApiProperty()
    id: number;

    @ApiProperty()
    content: string;
}
