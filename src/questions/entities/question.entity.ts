import { ApiProperty } from "@nestjs/swagger";
import { Option } from "src/options/entities/option.entity";

export class Question {
    @ApiProperty()
    id: number;

    @ApiProperty()
    statement: string;

    @ApiProperty()
    quiz_id?: number;

    @ApiProperty({ type: [Option] })
    options?: Option[];
}
