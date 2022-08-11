import { ApiProperty } from "@nestjs/swagger";

export class Quiz {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
