import { ApiProperty } from "@nestjs/swagger";
import { Option } from "src/options/entities/option.entity";

export class Question {
    @ApiProperty()
    id: string;

    @ApiProperty()
    statement: string;

    @ApiProperty()
    quiz_id?: string;

    @ApiProperty({ type: [Option] })
    options?: Option[];
}
