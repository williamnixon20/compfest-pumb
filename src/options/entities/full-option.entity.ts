import { ApiProperty } from "@nestjs/swagger";
import { Option } from "./option.entity";

export class FullOption extends Option {
    @ApiProperty()
    question_id: number;
}